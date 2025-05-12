import express from 'express';
import CommunicationLog from '../models/CommunicationLog.js';

const router = express.Router();

router.post('/send', async (req, res) => {
  try {
    const { logId, message, email } = req.body;
    const status = Math.random() < 0.9 ? 'SENT' : 'FAILED';
    await CommunicationLog.findByIdAndUpdate(logId, { status });
    res.json({ status });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;