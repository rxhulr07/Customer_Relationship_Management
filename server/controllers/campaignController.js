const Campaign = require('../models/Campaign');
const CommunicationLog = require('../models/CommunicationLog');
const Customer = require('../models/Customer');
const { sendEmail } = require('../services/emailService');
const { buildSegmentQuery } = require('../services/segmentService');

exports.createCampaign = async (req, res) => {
  try {
    const { name, description, segmentId, message } = req.body;
    
    // Get segment and build query
    const query = await buildSegmentQuery(segmentId);
    const audienceSize = await Customer.countDocuments(query);
    
    // Create campaign
    const campaign = new Campaign({
      name,
      description,
      segment: segmentId,
      message,
      audienceSize,
      createdBy: req.user.id,
    });
    
    await campaign.save();
    
    // Get customers in segment
    const customers = await Customer.find(query);
    
    // Send campaign messages
    let sentCount = 0;
    let failedCount = 0;
    
    for (const customer of customers) {
      try {
        const personalizedMessage = message.replace('{name}', customer.name);
        
        // Simulate sending via dummy vendor API (90% success rate)
        const success = Math.random() < 0.9;
        
        const log = new CommunicationLog({
          campaign: campaign._id,
          customer: customer._id,
          message: personalizedMessage,
          status: success ? 'sent' : 'failed',
          sentAt: new Date(),
        });
        
        await log.save();
        
        if (success) {
          sentCount++;
        } else {
          failedCount++;
        }
      } catch (err) {
        failedCount++;
      }
    }
    
    // Update campaign stats
    campaign.sentCount = sentCount;
    campaign.failedCount = failedCount;
    campaign.status = 'sent';
    await campaign.save();
    
    res.status(201).json(campaign);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find({ createdBy: req.user.id })
      .sort({ createdAt: -1 })
      .populate('segment');
      
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};