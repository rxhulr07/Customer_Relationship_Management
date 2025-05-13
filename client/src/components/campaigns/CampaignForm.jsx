import { useState } from 'react'
import '../../styles/components/campaign-form.css'

export default function CampaignForm({ segments, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    segmentId: '',
    message: 'Hi {name}, here\'s a special offer for you!'
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="campaign-form-container">
      <form onSubmit={handleSubmit} className="campaign-form">
        <h3>Create New Campaign</h3>
        
        <div className="form-group">
          <label>Campaign Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
          />
        </div>
        
        <div className="form-group">
          <label>Audience Segment</label>
          <select
            name="segmentId"
            value={formData.segmentId}
            onChange={handleChange}
            required
          >
            <option value="">Select a segment</option>
            {segments.map(segment => (
              <option key={segment._id} value={segment._id}>
                {segment.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label>Message Template</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            required
          />
          <small>Use {'{name}'} to insert customer name</small>
        </div>
        
        <div className="form-actions">
          <button type="button" onClick={onCancel} className="btn-outline">
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            Create Campaign
          </button>
        </div>
      </form>
    </div>
  )
}