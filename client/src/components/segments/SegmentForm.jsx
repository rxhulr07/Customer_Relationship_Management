// src/components/segments/SegmentForm.jsx
import React, { useState } from 'react';
import RuleBuilder from './RuleBuilder';
import api from '../../services/api';

const SegmentForm = () => {
  const [name, setName] = useState('');
  const [rules, setRules] = useState([]);
  const [previewSize, setPreviewSize] = useState(null);

  const previewSegment = async () => {
    const res = await api.post('/segments/preview', { rules });
    setPreviewSize(res.data.size);
  };

  const saveSegment = async () => {
    await api.post('/segments', { name, rules });
    alert('Segment created and campaign triggered!');
  };

  return (
    <div className="segment-form">
      <h2>Create Segment</h2>
      <input
        type="text"
        placeholder="Segment Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <RuleBuilder rules={rules} setRules={setRules} />

      <button onClick={previewSegment}>Preview Audience Size</button>
      {previewSize !== null && <p>Matching customers: {previewSize}</p>}

      <button onClick={saveSegment}>Save Segment & Trigger Campaign</button>
    </div>
  );
};

export default SegmentForm;
