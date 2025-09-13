import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchLogs() {
      try {
        setLoading(true);
        const res = await axios.get("/api/logs");
        setLogs(res.data);
      } catch {
        setError("Failed to load logs");
      } finally {
        setLoading(false);
      }
    }
    fetchLogs();
  }, []);

  if (loading) return <div className="text-center py-8">Loading logs...</div>;
  if (error) return <div className="text-center text-red-500 py-8">{error}</div>;

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-indigo-700">Activity Logs</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-indigo-50">
              <th className="p-2 text-left">Timestamp</th>
              <th className="p-2 text-left">User</th>
              <th className="p-2 text-left">Role</th>
              <th className="p-2 text-left">Action</th>
              <th className="p-2 text-left">Details</th>
            </tr>
          </thead>
          <tbody>
            {logs.map(log => (
              <tr key={log._id} className="border-b">
                <td className="p-2">{new Date(log.timestamp).toLocaleString()}</td>
                <td className="p-2">{log.user?.email || "-"}</td>
                <td className="p-2">{log.role}</td>
                <td className="p-2">{log.action}</td>
                <td className="p-2">{log.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
