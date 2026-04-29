const express = require("express");

module.exports = (db) => {
  const router = express.Router();

  router.post("/", async (req, res) => {
    try {
      const { name, email, message } = req.body;

     
      if (!name || !email || !message) {
        return res.status(400).json({ message: "All fields are required" });
      }

      
      const [result] = await db.query(
        "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)",
        [name, email, message]
      );

      return res.status(201).json({
        message: "Message sent successfully",
        id: result.insertId
      });

    } catch (err) {
      return res.status(500).json({
        message: "Error inserting message",
        error: err.message
      });
    }
  });

  return router;
};