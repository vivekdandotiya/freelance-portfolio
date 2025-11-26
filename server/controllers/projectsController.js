const Project = require('../models/Project');

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) { res.status(500).json({ error: 'Server error' }); }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ msg: 'Not found' });
    res.json(project);
  } catch (err) { res.status(500).json({ error: 'Server error' }); }
};

exports.createProject = async (req, res) => {
  try {
    const { title, description, category, figmaUrl, tags } = req.body;
    const images = (req.files || []).map(f => ({ url: f.path, public_id: f.filename }));
    const project = await Project.create({ title, description, category, figmaUrl, tags: tags ? tags.split(',') : [], images });
    res.status(201).json(project);
  } catch (err) { console.error(err); res.status(500).json({ error: 'Server error' }); }
};
