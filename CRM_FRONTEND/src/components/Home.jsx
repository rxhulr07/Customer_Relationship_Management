import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/home.css';

const Home = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/campaigns', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then((response) => setCampaigns(response.data))
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
      </div>
    </div>
  );
};

export default Home;