import { format } from 'date-fns'
import '../../styles/components/campaign-item.css'

export default function CampaignItem({ campaign }) {
  return (
    <div className="campaign-item">
      <div className="campaign-header">
        <h4>{campaign.name}</h4>
        <span className="campaign-date">
          {format(new Date(campaign.createdAt), 'MMM dd, yyyy')}
        </span>
      </div>
      
      <p className="campaign-description">{campaign.description}</p>
      
      <div className="campaign-stats">
        <div className="stat-item">
          <span className="stat-badge stat-audience"></span>
          <span>Audience: {campaign.audienceSize}</span>
        </div>
        <div className="stat-item">
          <span className="stat-badge stat-sent"></span>
          <span>Sent: {campaign.sentCount}</span>
        </div>
        <div className="stat-item">
          <span className="stat-badge stat-failed"></span>
          <span>Failed: {campaign.failedCount}</span>
        </div>
      </div>
    </div>
  )
}