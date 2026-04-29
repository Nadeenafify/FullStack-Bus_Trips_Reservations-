const express = require("express");
const { generateAccessToken } = require("../../utils/token");

module.exports = (db) => {

  const router = express.Router()
  const jwt = require("jsonwebtoken");
  router.post("/", async (req, res) => {
    const token = req.cookies.refreshToken;
   

    if (!token) return res.sendStatus(401);

    try {
      const decoded = jwt.verify(token, process.env.REFRESH_SECRET);


      const [rows] = await db.query(
        "SELECT * FROM users WHERE id=? AND refreshToken=?",
        [decoded.id, token]
      );

      if (!rows.length) return res.sendStatus(403);

      const accessToken = generateAccessToken(rows[0]);

      res.json({ accessToken });
    } catch (err) {
        console.log("REFRESH ERROR:", err.message);
      res.sendStatus(403);
    }
  });


  return router
}

