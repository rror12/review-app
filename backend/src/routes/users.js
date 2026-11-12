const express = require("express");
const { pool } = require("../config/postgres");

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email)
    return res.status(400).json({ error: "name and email required" });
  try {
    const result = await pool.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
      [name, email],
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err.code === "23505")
      return res.status(409).json({ error: "email already exists" });
    console.error(err);
    res.status(500).json({ error: "server error" });
  }
});

router.get("/", async (req, res) => {
  const result = await pool.query("SELECT * FROM users ORDER BY id DESC");
  res.json(result.rows);
});

module.exports = router;
