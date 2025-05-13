// src/components/customers/CustomerForm.jsx
import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const CustomerForm = ({ customerId }) => {
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    totalSpend: 0,
    visitCount: 0,
    lastActive: 0
  });

  useEffect(() => {
    if (customerId) {
      const fetchCustomer = async () => {
        try {
          const res = await api.get(`/customers/${customerId}`);
          setCustomer(res.data);
        } catch (err) {
          console.error('Error fetching customer data', err);
        }
      };
      fetchCustomer();
    }
  }, [customerId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({
      ...customer,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (customerId) {
        await api.put(`/customers/${customerId}`, customer);
        alert('Customer updated!');
      } else {
        await api.post('/customers', customer);
        alert('Customer added!');
      }
    } catch (err) {
      console.error('Error submitting customer data', err);
    }
  };

  return (
    <div className="customer-form">
      <h2>{customerId ? 'Edit Customer' : 'Add Customer'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Customer Name"
          value={customer.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Customer Email"
          value={customer.email}
          onChange={handleChange}
        />
        <input
          type="number"
          name="totalSpend"
          placeholder="Total Spend"
          value={customer.totalSpend}
          onChange={handleChange}
        />
        <input
          type="number"
          name="visitCount"
          placeholder="Visit Count"
          value={customer.visitCount}
          onChange={handleChange}
        />
        <input
          type="number"
          name="lastActive"
          placeholder="Last Active (days ago)"
          value={customer.lastActive}
          onChange={handleChange}
        />
        <button type="submit">Save Customer</button>
      </form>
    </div>
  );
};

export default CustomerForm;
