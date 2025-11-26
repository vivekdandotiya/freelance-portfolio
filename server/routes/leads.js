const express = require('express');
const router = express.Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const parser = multer({ storage: new CloudinaryStorage({ cloudinary, params: { folder: 'lead_attachments' } }) });

const { createLead, getLeads, updateLead } = require('../controllers/leadsController');

router.post('/', parser.array('attachments', 4), createLead);
router.get('/', getLeads);
router.patch('/:id', updateLead);

module.exports = router;
