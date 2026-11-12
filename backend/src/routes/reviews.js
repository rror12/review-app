const express = require("express");
const Review = require("../models/Review");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const doc = await Review.create(req.body);
    res.status(201).json(doc);
  } catch (err) {
    if (err.name === "ValidationError")
      return res.status(400).json({ error: err.message });
    console.error(err);
    res.status(500).json({ error: "server error" });
  }
});

router.get("/", async (req, res) => {
  const docs = await Review.find().sort({ createdAt: -1 });
  res.json(docs);
});

module.exports = router;
