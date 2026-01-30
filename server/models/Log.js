const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  level: {
    type: String,
    enum: ["INFO", "WARN", "ERROR"],
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Log", logSchema);
