import { useState, useEffect } from 'react'
import SegmentForm from '../components/segments/SegmentForm'
import { getSegments } from '../services/segment'
import '../styles/pages/segments.css'

export default function SegmentsPage() {
  const [segments, setSegments] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSegments = async () => {
      try {
        const data = await getSegments()
        setSegments(data)
      } catch (error) {
        console.error('Error fetching segments:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchSegments()
  }, [])

  const handleCreateSegment = async (segmentData) => {
    try {
      // In a real app, you would call your API here
      const newSegment = { ...segmentData, _id: Date.now().toString() }
      setSegments([newSegment, ...segments])
      setShowForm(false)
    } catch (error) {
      console.error('Error creating segment:', error)
    }
  }

  if (loading) {
    return <div className="loading">Loading segments...</div>
  }

  return (
    <div className="segments-page">
      <div className="segments-header">
        <h2>Customer Segments</h2>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(true)}
        >
          Create Segment
        </button>
      </div>

      {showForm && (
        <SegmentForm
          onSubmit={handleCreateSegment}
          onCancel={() => setShowForm(false)}
        />
      )}

      <div className="segments-list">
        {segments.length === 0 ? (
          <p>No segments found</p>
        ) : (
          segments.map(segment => (
            <div key={segment._id} className="segment-item">
              <h4>{segment.name}</h4>
              <p>{segment.description}</p>
              <div className="segment-rules">
                {segment.rules.map((rule, i) => (
                  <span key={i} className="rule-badge">
                    {rule.field} {rule.operator} {rule.value}
                  </span>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}