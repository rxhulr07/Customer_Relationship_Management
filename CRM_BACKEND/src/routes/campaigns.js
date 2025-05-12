import express from 'express';
import Customer from '../models/Customer.js';
import CommunicationLog from '../models/CommunicationLog.js';
import axios from 'axios';
import auth from '../middleware/auth.js';

const router = express.Router();

const evaluateRules = (customer, rules) => {
  return rules.every(rule => {
    if (rule.operator === 'AND') {
      return evaluateRules(customer, rule.conditions);
    } else if (rule.operator === 'OR') {
      return rule.conditions.some(cond => evaluateRules(customer, [cond]));
    } else {
      const { field, operator, value } = rule;
      if (field === 'totalSpend') {
        return operator === '>' ? customer.totalSpend > value : customer.totalSpend < value;
      } else if (field === 'visits') {
        return operator === '<' ? customer.visits < value : customer.visits > value;
      } else if (field === 'inactiveDays') {
        const days = (Date.now() - new Date(customer.lastPurchase)) / (1000 * 60 * 60 * 24);
        return operator === '>' ? days > value : days < value;
      }
      return false;
    }
  });
};

router.post('/preview', auth, async (req, res) => {
  try {
    const { rules } = req.body;
    const customers = await Customer.find();
    const audience = customers.filter(customer => evaluateRules(customer, rules));
    res.json({ audienceSize: audience.length });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { campaignName, rules, messageTemplate } = req.body;
    const customers = await Customer.find();
    const audience = customers.filter(customer => evaluateRules(customer, rules));

    for (const customer of audience) {
      const message = messageTemplate.replace('{name}', customer.name);
      const log = new CommunicationLog({
        campaignName,
        customerId: customer._id,
        message,
      });
      await log.save();

      // Simulate vendor API call
      try {
        await axios.post('http://localhost:5000/api/delivery/send', {
          logId: log._id,
          message,
          email: customer.email,
        });
      } catch (error) {
        console.error('Vendor API error:', error.message);
      }
    }

    res.status(201).json({ message: 'Campaign created' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/history', auth, async (req, res) => {
  try {
    const logs = await CommunicationLog.find()
      .populate('customerId', 'name email')
      .sort({ createdAt: -1 });
    const campaigns = logs.reduce((acc, log) => {
      if (!acc[log.campaignName]) {
        acc[log.campaignName] = { sent: 0, failed: 0, audienceSize: 0 };
      }
      acc[log.campaignName].audienceSize += 1;
      if (log.status === 'SENT') acc[log.campaignName].sent += 1;
      if (log.status === 'FAILED') acc[log.campaignName].failed += 1;
      return acc;
    }, {});
    res.json(Object.entries(campaigns).map(([name, stats]) => ({ campaignName: name, ...stats })));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;