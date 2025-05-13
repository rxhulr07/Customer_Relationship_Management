// src/components/segments/RuleBuilder.jsx
import React, { useState } from 'react';

const fields = [
  { label: 'Total Spend', value: 'totalSpend' },
  { label: 'Visit Count', value: 'visitCount' },
  { label: 'Last Active Days Ago', value: 'lastActive' }
];

const operators = ['>', '<', '=', '>=', '<='];

const RuleBuilder = ({ rules, setRules }) => {
  const addRule = () => {
    setRules([...rules, { field: 'totalSpend', operator: '>', value: '' }]);
  };

  const updateRule = (index, key, value) => {
    const updated = [...rules];
    updated[index][key] = value;
    setRules(updated);
  };

  const removeRule = (index) => {
    const updated = [...rules];
    updated.splice(index, 1);
    setRules(updated);
  };

  return (
    <div className="rule-builder">
      {rules.map((rule, index) => (
        <div key={index} className="rule">
          <select value={rule.field} onChange={(e) => updateRule(index, 'field', e.target.value)}>
            {fields.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
          </select>

          <select value={rule.operator} onChange={(e) => updateRule(index, 'operator', e.target.value)}>
            {operators.map(op => <option key={op} value={op}>{op}</option>)}
          </select>

          <input
            type="number"
            value={rule.value}
            onChange={(e) => updateRule(index, 'value', e.target.value)}
          />

          <button onClick={() => removeRule(index)}>Remove</button>
        </div>
      ))}

      <button onClick={addRule}>Add Rule</button>
    </div>
  );
};

export default RuleBuilder;
