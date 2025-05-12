import mongoose from 'mongoose';

const communicationLogSchema = new mongoose.Schema({
  campaignName: { type: String, required: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['PENDING', 'SENT', 'FAILED'], default: 'PENDING' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('CommunicationLog', communicationLogSchema);