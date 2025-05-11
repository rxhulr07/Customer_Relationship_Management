import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/campaign.css';

const Campaign = () => {
  const [campaignName, setCampaignName] = useState('');
  const [message, setMessage] = useState('');
  const [rules, setRules] = useState([
    { field: 'age', operator: '>', value: '' },
  ]);
  const [audienceSize, setAudienceSize] = useState(0);

  const addRule = () => {
    setRules([...rules, { field: 'age', operator: '>', value: '' }]);
  };

  const updateRule = async (index, key, value) => {
    const newRules = [...rules];
    newRules[index][key] = value;
    setRules(newRules);
    try {
      const response = await axios.post(
        'http://localhost:5000/api/customers/segment',
        { rules: newRules },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setAudienceSize(response.data.audienceSize);
    } catch (error) {
      console.error('Error calculating audience size:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.post(
        'http://localhost:5000/api/campaigns',
        { name: campaignName, message, segment: rules },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      console.log('Campaign created successfully');
    } catch (error) {
      console.error('Error creating campaign:', error);
    }
  };

  return (
    <div className="campaign-container">
      <div className="campaign-card">
        <h2>Create New Campaign</h2>
        <div className="campaign-form">
          <input
            type="text"
            placeholder="Campaign Name"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
          />
          <textarea
            placeholder="Campaign Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="4"
          />
          <div className="rule-builder">
            <h3>Customer Segment</h3>
            {rules.map((rule, index) => (
              <div key={index} className="rule-group">
                <select
                  value={rule.field}
                  onChange={(e) => updateRule(index, 'field', e.target.value)}
                >
                  <option value="age">Age</option>
                  <option value="location">Location</option>
                  <option value="purchases">Purchases</option>
                </select>
                <select
                  value={rule.operator}
                  onChange={(e) => updateRule(index, 'operator', e.target.value)}
                >
                  <option value=">">Greater Than</option>
                  <option value="<">Less Than</option>
                  <option value="=">Equals</option>
                </select>
                <input
                  type="text"
                  placeholder="Value"
                  value={rule.value}
                  onChange={(e) => updateRule(index, 'value', e.target.value)}
                />
              </div>
            ))}
            <button className="campaign-button" onClick={addRule}>
              Add Rule
            </button>
          </div>
          <div className="audience-preview">
            <p>Estimated Audience Size: {audienceSize} customers</p>
          </div>
          <button className="campaign-button" onClick={handleSubmit}>
            Create Campaign
          </button>
        </div>
      </div>
    </div>
  );
};

export default Campaign;