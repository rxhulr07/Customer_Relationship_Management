// src/routes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import CustomerPage from './pages/CustomerPage';
import CustomersPage from './pages/CustomersPage';
import SegmentsPage from './pages/SegmentsPage';
import CampaignsPage from './pages/CampaignsPage';
import PrivateRoute from './components/auth/PrivateRoute';

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/" element={
      <PrivateRoute><DashboardPage /></PrivateRoute>
    } />
    <Route path="/customers" element={
      <PrivateRoute><CustomersPage /></PrivateRoute>
    } />
    <Route path="/customers/edit/:customerId" element={<PrivateRoute><CustomerPage /></PrivateRoute>
  } />
    <Route path="/segments" element={
      <PrivateRoute><SegmentsPage /></PrivateRoute>
    } />
    <Route path="/campaigns" element={
      <PrivateRoute><CampaignsPage /></PrivateRoute>
    } />
  </Routes>
);

export default AppRoutes;
