const mongoose = require("mongoose");

const logSchema = new mongoose.Schema(
  {
    level: String,
    message: String,
    userEmail: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Log", logSchema);
