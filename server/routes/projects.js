const express = require('express');
const router = express.Router();
const { getProjects, getProjectById, createProject } = require('../controllers/projectsController');

const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary,
  params: { folder: 'portfolio_projects' }
});
const parser = multer({ storage });

router.get('/', getProjects);
router.get('/:id', getProjectById);
router.post('/', parser.array('images', 6), createProject);

module.exports = router;
