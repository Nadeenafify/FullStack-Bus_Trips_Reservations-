const express = require("express")
const bcrypt = require("bcrypt");
const { generateAccessToken, generateRefreshToken } = require("../../utils/token");
module.exports = (db) => {

  const router = express.Router()

  router.post("/", async (req, res) => {
    const { email, password } = req.body;

    const [rows] = await db.query("SELECT * FROM users WHERE email=?", [email]);
    if (!rows.length) return res.status(401).json({ message: "Invalid eamil" });

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);


    await db.query("UPDATE users SET refreshToken=? WHERE id=?", [
      refreshToken,
      user.id,
    ]);


    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    res.json({ accessToken, userId:user.id });
  });

  return router
}