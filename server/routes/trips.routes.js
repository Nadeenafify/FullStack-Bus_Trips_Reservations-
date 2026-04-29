const express = require("express");

module.exports = (db) => {

  const router = express.Router()

  router.get("/", async (req, res) => {
    try {
      const {
        fromCity,
        toCity,
        date,
        minPrice,
        maxPrice,
        time,
        busType,
        amenities,
      } = req.query;

      let sql = `
      SELECT 
        t.tripId,
        sc.nameEn AS sourceEn, 
        sc.nameAr AS sourceAr,
        dc.nameEn AS destinationEn,
        dc.nameAr AS destinationAr,
        t.departureTime,
        t.arrivalTime,
        t.price
      FROM trips t
      JOIN cities sc ON t.sourceCityId = sc.id
      JOIN cities dc ON t.destinationCityId = dc.id
      WHERE 1=1
    `;

      let params = [];


      if (fromCity) {
        sql += " AND t.sourceCityId = ?";
        params.push(fromCity);
      }

      if (toCity) {
        sql += " AND t.destinationCityId = ?";
        params.push(toCity);
      }


      if (date) {
        sql += " AND DATE(t.departureTime) = ?";
        params.push(date);
      }


      if (minPrice) {
        sql += " AND t.price >= ?";
        params.push(minPrice);
      }

      if (maxPrice) {
        sql += " AND t.price <= ?";
        params.push(maxPrice);
      }


      if (time === "morning") {
        sql += " AND HOUR(t.departureTime) BETWEEN 6 AND 12";
      } else if (time === "afternoon") {
        sql += " AND HOUR(t.departureTime) BETWEEN 12 AND 18";
      } else if (time === "evening") {
        sql += " AND (HOUR(t.departureTime) >= 18 OR HOUR(t.departureTime) < 6)";
      }


      if (amenities) {
        const arr = Array.isArray(amenities) ? amenities : [amenities];

        sql += `
        AND t.tripId IN (
          SELECT ta.tripId
          FROM trip_amenities ta
          JOIN amenities a ON ta.amenityId = a.id
          WHERE a.nameEn IN (${arr.map(() => "?").join(",")})
        )
      `;

        params.push(...arr);
      }


      const [rows] = await db.query(sql, params);

      if (rows.length === 0) {
        return res.status(404).json({ message: "Trip not found" });
      }

      res.status(200).json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.get("/:id", async (req, res) => {

    try {
      const { id } = req.params
      const [rows] = await db.query(
        `SELECT 
        t.tripId,
        t.departureTime,
        t.arrivalTime,
        t.price,
        sc.nameEn AS sourceEn,
        sc.nameAr AS sourceAr,
        dc.nameEn AS destinationEn,
        dc.nameAr AS destinationAr
      FROM trips t
      JOIN cities sc ON t.sourceCityId = sc.id
      JOIN cities dc ON t.destinationCityId = dc.id
      WHERE t.tripId = ?`,
        [id]
      );

      if (rows.length == 0)
        res.status(404).json({ message: "trip not found" })
      res.status(200).json(rows[0])
    }
    catch (err) {
      res.status(200).json({ error: err.message })
    }
  })



  return router
}


