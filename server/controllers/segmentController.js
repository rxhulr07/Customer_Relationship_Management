const Segment = require('../models/Segment');
const { previewSegment } = require('../services/segmentService');

exports.createSegment = async (req, res) => {
  try {
    const { name, description, rules, condition } = req.body;
    
    const segment = new Segment({
      name,
      description,
      rules,
      condition,
      createdBy: req.user.id
    });

    await segment.save();
    res.status(201).json(segment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.previewSegment = async (req, res) => {
  try {
    const { rules, condition } = req.body;
    const count = await previewSegment(rules, condition);
    res.json({ count });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getSegments = async (req, res) => {
  try {
    const segments = await Segment.find({ createdBy: req.user.id });
    res.json(segments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};