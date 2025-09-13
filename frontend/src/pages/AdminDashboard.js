

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminPlans from './AdminPlans';
import AdminDiscounts from './AdminDiscounts';
import AdminAnalytics from './AdminAnalytics';
import AdminLogs from './AdminLogs';

function AdminDashboardHome() {
  return (
    <div className="bg-white p-4 rounded shadow">Welcome, Admin!</div>
  );
}






function AdminDashboard() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <Routes>
        <Route path="" element={<AdminDashboardHome />} />
        <Route path="plans" element={<AdminPlans />} />
        <Route path="discounts" element={<AdminDiscounts />} />
        <Route path="analytics" element={<AdminAnalytics />} />
  <Route path="logs" element={<AdminLogs />} />
  <Route path="*" element={<Navigate to="." />} />
      </Routes>
    </div>
  );
}

export default AdminDashboard;
