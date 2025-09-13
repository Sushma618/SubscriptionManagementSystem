import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UserNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchNotifications() {
      try {
        setLoading(true);
        const res = await axios.get("/api/notifications");
        setNotifications(res.data);
      } catch {
        setError("Failed to load notifications");
      } finally {
        setLoading(false);
      }
    }
    fetchNotifications();
  }, []);

  if (loading) return <div className="text-center py-8">Loading notifications...</div>;
  if (error) return <div className="text-center text-red-500 py-8">{error}</div>;

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-indigo-700">Notifications</h2>
      {notifications.length === 0 ? (
        <div className="text-gray-500">No notifications.</div>
      ) : (
        <ul className="space-y-3">
          {notifications.map((n, i) => (
            <li key={i} className={`p-3 rounded-lg shadow flex items-center gap-3 ${n.type === 'offer' ? 'bg-green-50 border-l-4 border-green-400' : 'bg-yellow-50 border-l-4 border-yellow-400'}`}>
              <span className="font-bold text-lg">{n.type === 'offer' ? '🎁' : '⚠️'}</span>
              <span className="text-gray-700">{n.message}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
