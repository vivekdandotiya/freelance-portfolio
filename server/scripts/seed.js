require('dotenv').config();
const connectDB = require('../config/db');
const Project = require('../models/Project');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const data = [
  { title: 'E-commerce UI', description: 'Figma designs for ecom', figmaUrl:'https://www.figma.com/' },
  { title: 'Portfolio Website', description: 'Personal website UI', figmaUrl:'https://www.figma.com/' }
];

const seed = async () => {
  await connectDB();

  // seed projects
  await Project.deleteMany({});
  await Project.insertMany(data);
  console.log('Seeded projects');

  // seed admin user
  const email = process.env.SEED_ADMIN_EMAIL || 'admin@example.com';
  const password = process.env.SEED_ADMIN_PASSWORD || 'password123';
  const hash = await bcrypt.hash(password, 10);
  await User.deleteMany({ email });
  await User.create({ name: 'Admin', email, passwordHash: hash });
  console.log('Seeded admin user:', email, 'password:', password);

  process.exit();
};

seed();
