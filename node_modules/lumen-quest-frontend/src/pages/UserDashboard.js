


import UserPlans from './UserPlans';
import UserSubscriptions from './UserSubscriptions';
import UserNotifications from './UserNotifications';

function UserDashboardHome() {
  return <div className="bg-white p-4 rounded shadow">Welcome to your dashboard!</div>;
}




import UserRecommendations from './UserRecommendations';


function UserDashboard() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
      <Routes>
        <Route path="" element={<UserDashboardHome />} />
        <Route path="plans" element={<UserPlans />} />
        <Route path="subscriptions" element={<UserSubscriptions />} />
        <Route path="recommendations" element={<UserRecommendations />} />
  <Route path="notifications" element={<UserNotifications />} />
  <Route path="*" element={<Navigate to="." />} />
      </Routes>
    </div>
  );
}

export default UserDashboard;

import { Routes, Route, Navigate } from 'react-router-dom';
