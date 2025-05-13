// src/pages/CustomerPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import CustomerForm from '../components/customers/CustomerForm';

const CustomerPage = () => {
  const { customerId } = useParams();

  return (
    <div className="customer-page">
      <h1>{customerId ? 'Edit Customer' : 'Add New Customer'}</h1>
      <CustomerForm customerId={customerId} />
    </div>
  );
};

export default CustomerPage;
