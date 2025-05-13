const axios = require('axios');
const CommunicationLog = require('../models/CommunicationLog');

// Mock vendor API URL
const VENDOR_API_URL = 'https://mock-vendor-api.example.com/send';

exports.sendEmail = async (campaignId, customer, message) => {
  try {
    // Simulate API call to vendor with 90% success rate
    const success = Math.random() < 0.9;
    
    // In a real implementation, we would actually call the vendor API:
    // const response = await axios.post(VENDOR_API_URL, {
    //   to: customer.email,
    //   message: message,
    //   campaign_id: campaignId
    // });
    
    // Simulate delivery receipt
    if (success) {
      setTimeout(async () => {
        await updateDeliveryStatus(campaignId, customer._id, 'delivered');
      }, 1000 * Math.random() * 10); // Random delay up to 10 seconds
    }
    
    return success ? 'sent' : 'failed';
  } catch (err) {
    console.error('Error sending email:', err);
    return 'failed';
  }
};

async function updateDeliveryStatus(campaignId, customerId, status) {
  await CommunicationLog.findOneAndUpdate(
    { campaign: campaignId, customer: customerId },
    { status, deliveredAt: new Date() }
  );
}