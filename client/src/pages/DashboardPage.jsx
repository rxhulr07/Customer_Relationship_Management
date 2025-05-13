import { useState, useEffect } from 'react'
import { getCampaigns } from '../services/campaign'
import '../styles/pages/dashboard.css'

export default function DashboardPage() {
  const [campaigns, setCampaigns] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const data = await getCampaigns()
        setCampaigns(data.slice(0, 3)) // Show only recent campaigns
      } catch (error) {
        console.error('Error fetching campaigns:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchCampaigns()
  }, [])

  return (
    <div className="dashboard-page">
      <h2>Dashboard</h2>
      
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>Recent Campaigns</h3>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul>
              {campaigns.map(campaign => (
                <li key={campaign._id}>
                  <strong>{campaign.name}</strong>
                  <span>Sent to {campaign.audienceSize} customers</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        <div className="dashboard-card">
          <h3>Quick Actions</h3>
          <div className="quick-actions">
            <button className="btn-primary">Create Campaign</button>
            <button className="btn-outline">View Customers</button>
          </div>
        </div>
      </div>
    </div>
  )
}