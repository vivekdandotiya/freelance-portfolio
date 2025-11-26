const Lead = require('../models/Lead');

exports.createLead = async (req, res) => {
  try {
    const { name, email, phone, serviceType, brief } = req.body;
    const attachments = (req.files || []).map(f => ({ url: f.path, public_id: f.filename }));
    const lead = await Lead.create({ name, email, phone, serviceType, brief, attachments });
    res.status(201).json(lead);
  } catch (err) { console.error(err); res.status(500).json({ error: 'Server error' }); }
};

exports.getLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (err) { res.status(500).json({ error: 'Server error' }); }
};

exports.updateLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(lead);
  } catch (err) { res.status(500).json({ error: 'Server error' }); }
};
