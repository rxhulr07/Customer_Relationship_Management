// src/components/customers/CustomerList.jsx
import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await api.get('/customers');
        setCustomers(res.data);
      } catch (err) {
        console.error('Error fetching customers', err);
      }
    };

    fetchCustomers();
  }, []);

  const deleteCustomer = async (id) => {
    try {
      await api.delete(`/customers/${id}`);
      setCustomers(customers.filter((customer) => customer._id !== id));
    } catch (err) {
      console.error('Error deleting customer', err);
    }
  };

  return (
    <div className="customer-list">
      <h2>Customer List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Total Spend</th>
            <th>Visit Count</th>
            <th>Last Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer._id}>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.totalSpend}</td>
              <td>{customer.visitCount}</td>
              <td>{customer.lastActive}</td>
              <td>
                <Link to={`/customers/edit/${customer._id}`}>Edit</Link>
                <button onClick={() => deleteCustomer(customer._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;
