const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  serviceType: String,
  brief: String,
  attachments: [{ url: String, public_id: String }],
  status: { type: String, enum: ['new','contacted','in_progress','completed'], default: 'new' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Lead', LeadSchema);
