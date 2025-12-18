require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const projectsRoutes = require("./routes/projects");
const leadsRoutes = require("./routes/leads");
const authRoutes = require("./routes/auth");

// ✅ CREATE APP FIRST
const app = express();

// ✅ MIDDLEWARE
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// ✅ DB CONNECTION
connectDB();

// ✅ ROUTES (AFTER app IS CREATED)
app.use("/api/projects", projectsRoutes);
app.use("/api/leads", leadsRoutes);
app.use("/api/auth", authRoutes);

// ✅ PORT
const PORT = process.env.PORT || 5000;

// ✅ START SERVER
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
