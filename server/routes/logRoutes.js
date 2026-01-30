const express = require("express");
const Log = require("../models/Log");

const router = express.Router();

// CREATE LOG
router.post("/", async (req, res) => {
  try {
    const { level, message, userEmail } = req.body;

    await Log.create({
      level,
      message,
      userEmail,
    });

    res.json({ success: true });
  } catch (error) {
    console.error("LOG CREATE ERROR:", error);
    res.status(500).json({ error: "Failed to create log" });
  }
});

// GET LOGS
router.get("/", async (req, res) => {
  try {
    const logs = await Log.find().sort({ createdAt: -1 });
    res.json(logs);
  } catch (error) {
    console.error("LOG FETCH ERROR:", error);
    res.status(500).json({ error: "Failed to fetch logs" });
  }
});

module.exports = router;
