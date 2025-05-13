// src/components/campaigns/CampaignHistory.jsx
import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const CampaignHistory = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await api.get('/campaigns');
        setCampaigns(res.data);
      } catch (err) {
        console.error('Error fetching campaigns', err);
      }
    };

    fetchCampaigns();
  }, []);

  return (
    <div className="campaign-history">
      <h2>Campaign History</h2>
      {campaigns.length === 0 ? (
        <p>No campaigns yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Message</th>
              <th>Audience</th>
              <th>Sent</th>
              <th>Failed</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c) => (
              <tr key={c._id}>
                <td>{new Date(c.createdAt).toLocaleString()}</td>
                <td>{c.message}</td>
                <td>{c.audienceSize}</td>
                <td>{c.sent}</td>
                <td>{c.failed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CampaignHistory;
