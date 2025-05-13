const mongoose = require('mongoose');

const RuleSchema = new mongoose.Schema({
  field: {
    type: String,
    required: true,
    enum: ['totalSpend', 'totalVisits', 'lastActive']
  },
  operator: {
    type: String,
    required: true,
    enum: ['>', '<', '>=', '<=', '==']
  },
  value: {
    type: String,
    required: true
  }
});

const SegmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  rules: [RuleSchema],
  condition: {
    type: String,
    enum: ['AND', 'OR'],
    default: 'AND'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Segment', SegmentSchema);