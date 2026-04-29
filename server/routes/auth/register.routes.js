const express = require("express")
const bcrypt = require("bcrypt");

module.exports = (db) => {

  const router = express.Router()

  router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

   
    if ( !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

   
    const [existingUser] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(409).json({ message: "Email already exists" });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

   
    const [result] = await db.query(
      "INSERT INTO users ( email, password) VALUES (?,?)",
      [ email, hashedPassword]
    );

    
    res.status(201).json({
      message: "User registered successfully",
      userId: result.insertId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

  return router
}







