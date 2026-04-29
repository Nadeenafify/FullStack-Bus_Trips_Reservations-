const express = require("express")


module.exports = (db) => {

    const router = express.Router()

    router.get("/:userId", async (req, res) => {
        const { userId } = req.params;

        const sql = `
        SELECT 
            t.tripId,t.price,
            sc.nameEn AS sourceCityEn,
            sc.nameAr AS sourceCityAr,
            dc.nameEn AS destinationCityEn,
            dc.nameAr AS destinationCityAr,
            r.seats
        FROM reservations r
        JOIN trips t ON r.tripId = t.tripId
        JOIN cities sc ON t.sourceCityId = sc.id
        JOIN cities dc ON t.destinationCityId = dc.id
        WHERE r.userId = ?;
    `;

        try {
            const [rows] = await db.query(sql, [userId]);

            if (rows.length === 0) {
                return res.status(404).json({ message: "No reservations found" });
            }

            res.status(200).json(rows);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    router.post("/addReservations", async (req, res) => {
        const connection = await db.getConnection();

        try {
            const { seats, userId, tripId, name, phone, email } = req.body;

            await connection.beginTransaction();

           
            const [existing] = await connection.query(
                `SELECT id, seats FROM reservations WHERE userId = ? AND tripId = ?`,
                [userId, tripId]
            );

            let reservationId;

            if (existing.length > 0) {
                
                const oldSeats = JSON.parse(existing[0].seats || "[]");

                const mergedSeats = [...new Set([...oldSeats, ...seats])];

                reservationId = existing[0].id;

                await connection.query(
                    `UPDATE reservations 
         SET seats = ?, name = ?, phone = ?, email = ?
         WHERE id = ?`,
                    [
                        JSON.stringify(mergedSeats),
                        name,
                        phone,
                        email,
                        reservationId,
                    ]
                );
            } else {
             
                const [result] = await connection.query(
                    `INSERT INTO reservations (seats, userId, tripId, name, phone, email)
         VALUES (?, ?, ?, ?, ?, ?)`,
                    [
                        JSON.stringify(seats),
                        userId,
                        tripId,
                        name,
                        phone,
                        email,
                    ]
                );

                reservationId = result.insertId;
            }

           
            for (let seatNumber of seats) {
                await connection.query(
                    `UPDATE seats 
         SET status = 'booked'
         WHERE seatNumber = ? AND tripId = ? AND status = 'available'`,
                    [seatNumber, tripId]
                );
            }

            await connection.commit();

            res.status(201).json({
                message: existing.length > 0
                    ? "Reservation updated successfully"
                    : "Reservation created successfully",
                reservationId,
            });

        } catch (err) {
            await connection.rollback();
            res.status(500).json({ message: err.message });
        } finally {
            connection.release();
        }
    });

    router.post("/cancelReservations", async (req, res) => {
        const { userId, tripId, seats } = req.body;

        if (!userId || !tripId || !Array.isArray(seats)) {
            return res.status(400).json({ message: "Invalid input" });
        }

        const connection = await db.getConnection();

        try {
            await connection.beginTransaction();


            const [deleteResult] = await connection.query(
                "DELETE FROM reservations WHERE userId = ? AND tripId = ?",
                [userId, tripId]
            );

            if (deleteResult.affectedRows === 0) {
                await connection.rollback();
                return res.status(404).json({ message: "Reservation not found" });
            }


            const [updateResult] = await connection.query(
                `UPDATE seats 
       SET status = 'available' 
       WHERE tripId = ? AND seatNumber IN (?)`,
                [tripId, seats]
            );

            await connection.commit();

            res.status(200).json({
                message: "Reservation cancelled and seats updated",
                updatedSeats: updateResult.affectedRows,
            });
        } catch (err) {
            await connection.rollback();
            console.error(err);
            res.status(500).json({ message: "Server error" });
        } finally {
            connection.release();
        }
    });

    return router
}