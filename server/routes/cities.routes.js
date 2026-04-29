const express = require("express")

module.exports = (db) => {

    const router = express.Router()

    router.get("/", async (req, res) => {

        try {

            const [rows] =await db.query("SELECT * FROM cities")
             if (rows.length === 0) 
               res.status(404).json({ message: "cities not found" });
            
            res.status(200).json(rows)
        }
        catch (err) {
            res.status(500).json(err.message)
        }
    })

    return router
}