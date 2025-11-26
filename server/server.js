require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const projectsRoutes = require('./routes/projects');
const leadsRoutes    = require('./routes/leads');
const authRoutes     = require('./routes/auth');

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(cors());

 connectDB(); // uncomment when your MONGO_URI is correct

app.use('/api/projects', projectsRoutes);
app.use('/api/leads',    leadsRoutes);
app.use('/api/auth',     authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));
