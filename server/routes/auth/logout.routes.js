const express = require("express");
const jwt = require("jsonwebtoken");

module.exports = (db) => {
  const router = express.Router();

  router.post("/", async (req, res) => {
    try {
      const token = req.cookies?.refreshToken;

      if (token) {
        const decoded = jwt.verify(token, process.env.REFRESH_SECRET);

        await db.query(
          "UPDATE users SET refreshToken = NULL WHERE id = ?",
          [decoded.id]
        );
      }

      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false, 
        sameSite: "lax",
      });

      return res.json({ message: "Logged out" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Logout failed" });
    }
  });

  return router;
};