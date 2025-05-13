const Segment = require('../models/Segment');

exports.buildSegmentQuery = async (segmentId) => {
  const segment = await Segment.findById(segmentId);
  if (!segment) throw new Error('Segment not found');
  
  const conditions = segment.rules.map(rule => {
    switch (rule.field) {
      case 'totalSpend':
        return { totalSpend: { [rule.operator]: parseFloat(rule.value) } };
      case 'totalVisits':
        return { totalVisits: { [rule.operator]: parseInt(rule.value) } };
      case 'lastActive':
        const days = parseInt(rule.value);
        const date = new Date();
        date.setDate(date.getDate() - days);
        return { lastActive: { [rule.operator]: date } };
      default:
        return {};
    }
  });
  
  if (segment.condition === 'AND') {
    return { $and: conditions };
  } else {
    return { $or: conditions };
  }
};

exports.previewSegment = async (rules, condition) => {
  const query = await this.buildSegmentQuery({ rules, condition });
  return Customer.countDocuments(query);
};