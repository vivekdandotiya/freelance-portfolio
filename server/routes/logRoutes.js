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
    res.status(500).json({ error: "Failed to create log" });
  }
});

// GET LOGS (FOR DASHBOARD)
router.get("/", async (req, res) => {
  try {
    console.log("Fetching logs...");
    const logs = await Log.find();
    console.log("Logs:", logs);
    res.json(logs);
  } catch (error) {
    console.error("LOG ERROR:", error);
    res.status(500).json({ error: "Failed to fetch logs" });
  }
});
module.exports = router;   // ✅ VERY IMPORTANT
