const express = require("express")

module.exports = (db) => {

    const router = express.Router()
    router.post("/", async (req, res) => {
        const {id}=req.body

        try {

            const sql = `
            SELECT 
           a.amenityId,
           a.nameEn,
           a.nameAr
           FROM trip_amenities ta
           JOIN amenities a ON ta.amenityId = a.amenityId
           WHERE ta.tripId = ${id}; 
            `

            const [rows] = await db.query(sql)
            const amenities = rows.map(r => ({
                en: r.nameEn,
                ar: r.nameAr
            }));

            res.status(200).json(amenities)
        }
        catch (err) {
            res.status(500).json(err.message)
        }
    })

    return router
}