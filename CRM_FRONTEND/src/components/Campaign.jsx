import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/campaign.css';

const Campaign = () => {
  const [campaignName, setCampaignName] = useState('');
  const [message, setMessage] = useState('');
  const [rules, setRules] = useState([
    { conditions: [{ field: 'age', operator: '>', value: '' }], logic: 'AND' },
  ]);
  const [audienceSize, setAudienceSize] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const addRuleGroup = () => {
    setRules((prev) => [
      ...prev,
      { conditions: [{ field: 'age', operator: '>', value: '' }], logic: 'AND' },
    ]);
  };

  const deleteRuleGroup = (ruleIndex) => {
    setRules((prev) => prev.filter((_, index) => index !== ruleIndex));
  };

  const addCondition = (ruleIndex) => {
    setRules((prev) => {
      const newRules = [...prev];
      newRules[ruleIndex].conditions.push({ field: 'age', operator: '>', value: '' });
      return newRules;
    });
  };

  const deleteCondition = (ruleIndex, conditionIndex) => {
    setRules((prev) => {
      const newRules = [...prev];
      newRules[ruleIndex].conditions = newRules[ruleIndex].conditions.filter(
        (_, index) => index !== conditionIndex
      );
      if (newRules[ruleIndex].conditions.length === 0) {
        newRules.splice(ruleIndex, 1);
      }
      return newRules.length > 0 ? newRules : [
        { conditions: [{ field: 'age', operator: '>', value: '' }], logic: 'AND' },
      ];
    });
  };

  const updateCondition = async (ruleIndex, conditionIndex, key, value) => {
    setRules((prev) => {
      const newRules = [...prev];
      newRules[ruleIndex].conditions[conditionIndex][key] = value;
      return newRules;
    });
    try {
      const response = await axios.post(
        'http://localhost:5000/api/customers/segment',
        { rules },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setAudienceSize(response.data.audienceSize);
      setError('');
    } catch (error) {
      setError('Error calculating audience size');
      console.error('Error calculating audience size:', error);
    }
  };

  const updateLogic = (ruleIndex, logic) => {
    setRules((prev) => {
      const newRules = [...prev];
      newRules[ruleIndex].logic = logic;
      return newRules;
    });
  };

  const handleSubmit = async () => {
    if (!campaignName || !message || rules.some((rule) => rule.conditions.some((cond) => !cond.value))) {
      setError('Please fill in all fields');
      return;
    }
    try {
      await axios.post(
        'http://localhost:5000/api/campaigns',
        { name: campaignName, message, segment: rules },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setSuccess('Campaign created successfully');
      setError('');
      setTimeout(() => navigate('/home'), 1000);
    } catch (error) {
      setError('Error creating campaign');
      console.error('Error creating campaign:', error);
    }
  };

  return (
    <div className="campaign-container">
      <div className="campaign-card">
        <h2>Create New Campaign</h2>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <div className="campaign-form">
          <input
            type="text"
            placeholder="Campaign Name"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
          />
          <textarea
            placeholder="Campaign Message (use {name} for personalization)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="4"
          />
          <div className="rule-builder">
            <h3>Customer Segment</h3>
            {rules.map((rule, ruleIndex) => (
              <div key={ruleIndex} className="rule-group">
                <div className="logic-selector">
                  <label>Logic: </label>
                  <select
                    value={rule.logic}
                    onChange={(e) => updateLogic(ruleIndex, e.target.value)}
                  >
                    <option value="AND">AND</option>
                    <option value="OR">OR</option>
                  </select>
                  <button
                    className="delete-group-button"
                    onClick={() => deleteRuleGroup(ruleIndex)}
                  >
                    Delete Group
                  </button>
                </div>
                {rule.conditions.map((condition, conditionIndex) => (
                  <div key={conditionIndex} className="condition-row">
                    <select
                      value={condition.field}
                      onChange={(e) => updateCondition(ruleIndex, conditionIndex, 'field', e.target.value)}
                    >
                      <option value="age">Age</option>
                      <option value="location">Location</option>
                      <option value="purchases">Purchases</option>
                      <option value="inactive">Inactive Days</option>
                    </select>
                    <select
                      value={condition.operator}
                      onChange={(e) => updateCondition(ruleIndex, conditionIndex, 'operator', e.target.value)}
                    >
                      <option value=">">Greater Than</option>
                      <option value="<">Less Than</option>
                      <option value="=">Equals</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Value"
                      value={condition.value}
                      onChange={(e) => updateCondition(ruleIndex, conditionIndex, 'value', e.target.value)}
                    />
                    <button
                      className="delete-condition-button"
                      onClick={() => deleteCondition(ruleIndex, conditionIndex)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
                <button
                  className="add-condition-button"
                  onClick={() => addCondition(ruleIndex)}
                >
                  Add Condition
                </button>
              </div>
            ))}
            <button className="add-group-button" onClick={addRuleGroup}>
              Add Rule Group
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