const express = require("express")

module.exports = (db) => {
    const router = express.Router()

    router.get("/:id", async (req, res) => {

        try {
            const { id } = req.params
            const [rows] = await db.query("select * from seats where tripId=?", [id])

            if (rows.length == 0)
                res.status(500).json({ message: "error when getting seats" })
            res.status(200).json({ message: "get seats successfully", data: rows })
        }
        catch (err) {
            res.status(500).json({ message: err.message })
        }
    })

//     router.put("/reserve/:seatId", async (req, res) => {
//     try {
//         const { seatId } = req.params;

//         const [result] = await db.query(
//             "UPDATE seats SET isReserved = 1 WHERE seatId = ? AND isReserved = 0",
//             [seatId]
//         );

//         if (result.affectedRows === 0) {
//             return res.status(400).json({
//                 message: "Seat already reserved or not found"
//             });
//         }

//         res.status(200).json({ message: "Seat reserved successfully" });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

    return router
}