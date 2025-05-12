import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/home.css';

const Home = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [analytics, setAnalytics] = useState({ totalCampaigns: 0, totalSent: 0, avgSuccessRate: 0 });

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/campaigns', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then((response) => {
        setCampaigns(response.data);
        const totalCampaigns = response.data.length;
        const totalSent = response.data.reduce((sum, c) => sum + c.sent, 0);
        const totalAudience = response.data.reduce((sum, c) => sum + c.audienceSize, 0);
        const avgSuccessRate = totalAudience ? ((totalSent / totalAudience) * 100).toFixed(2) : 0;
        setAnalytics({ totalCampaigns, totalSent, avgSuccessRate });
      })
      .catch((error) => console.error('Error fetching campaigns:', error));
  }, []);

  return (
    <div className="home-container">
      <div className="home-card">
        <h2>Welcome to Mini CRM Dashboard</h2>
        <p style={{ textAlign: 'center', color: '#666' }}>
          Manage your campaigns and customer segments efficiently.
        </p>
        <Link to="/campaign">
          <button className="home-button">Create New Campaign</button>
        </Link>
      </div>
      <div className="home-card">
        <h2>Campaign History</h2>
        <table className="campaign-table">
          <thead>
            <tr>
              <th>Campaign ID</th>
              <th>Audience Size</th>
              <th>Sent</th>
              <th>Failed</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign) => (
              <tr key={campaign._id}>
                <td>{campaign.name}</td>
                <td>{campaign.audienceSize}</td>
                <td>{campaign.sent}</td>
                <td>{campaign.failed}</td>
                <td>{new Date(campaign.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="analytics-section">
          <h3>Campaign Insights</h3>
          <p>Total Campaigns: {analytics.totalCampaigns}</p>
          <p>Total Messages Sent: {analytics.totalSent}</p>
          <p>Average Success Rate: {analytics.avgSuccessRate}%</p>
        </div>
      </div>
    </div>
  );
};

export default Home;