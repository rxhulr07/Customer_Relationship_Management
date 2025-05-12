const mongoose = require('mongoose');
const campaignSchema = new mongoose.Schema({
  name: String,
  message: String,
  segment: [{ field: String, operator: String, value: String }],
  audienceSize: Number,
  sent: Number,
  failed: Number,
  createdAt: { type: Date, default: Date.now },
  userId: mongoose.Schema.Types.ObjectId,
});
module.exports = mongoose.model('Campaign', campaignSchema);