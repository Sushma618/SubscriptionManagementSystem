import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";

export default function UserSubscriptions() {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const fetchSubs = async () => {
    try {
      setLoading(true);
  const res = await axios.get("/api/subscriptions");
      setSubs(res.data);
    } catch (err) {
      setError("Failed to load subscriptions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubs();
  }, []);

  if (loading) return <div className="text-center py-8">Loading subscriptions...</div>;
  if (error) return <div className="text-center text-red-500 py-8">{error}</div>;
  if (successMsg) return <div className="text-center text-green-600 py-8 font-semibold">{successMsg}</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-indigo-700">Your Subscriptions</h2>
      {subs.length === 0 ? (
        <div className="bg-white p-6 rounded shadow text-center text-gray-500">No active subscriptions.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {subs.map((sub) => (
            <div key={sub._id} className="bg-white rounded-xl shadow p-6 flex flex-col gap-2 border border-indigo-100">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg font-semibold text-indigo-600">{sub.plan?.name}</span>
                <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded">{sub.plan?.productType}</span>
              </div>
              <div className="text-sm text-gray-600 mb-2">Status: <span className="font-semibold text-indigo-700">{sub.status}</span></div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-indigo-700 font-bold text-lg">₹{sub.plan?.price}</span>
                <span className="text-xs text-gray-500">Quota: {sub.plan?.quota}GB/mo</span>
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-1 px-4 rounded hover:from-blue-600 hover:to-indigo-600 transition disabled:opacity-60"
                  disabled={actionLoading === sub._id + "-renew"}
                  onClick={async () => {
                    setActionLoading(sub._id + "-renew");
                    setError("");
                    setSuccessMsg("");
                    try {
                      await axios.post("/api/subscriptions/renew", { subscriptionId: sub._id });
                      setSuccessMsg("Subscription renewed!");
                      await fetchSubs();
                    } catch (err) {
                      setError("Failed to renew. " + (err.response?.data?.message || ""));
                    } finally {
                      setActionLoading("");
                    }
                  }}
                >
                  {actionLoading === sub._id + "-renew" ? "Renewing..." : "Renew"}
                </button>
                <button
                  className="bg-gradient-to-r from-red-400 to-pink-500 text-white py-1 px-4 rounded hover:from-red-500 hover:to-pink-600 transition disabled:opacity-60"
                  disabled={actionLoading === sub._id + "-cancel"}
                  onClick={async () => {
                    setActionLoading(sub._id + "-cancel");
                    setError("");
                    setSuccessMsg("");
                    try {
                      await axios.post("/api/subscriptions/cancel", { subscriptionId: sub._id });
                      setSuccessMsg("Subscription cancelled.");
                      await fetchSubs();
                    } catch (err) {
                      setError("Failed to cancel. " + (err.response?.data?.message || ""));
                    } finally {
                      setActionLoading("");
                    }
                  }}
                >
                  {actionLoading === sub._id + "-cancel" ? "Cancelling..." : "Cancel"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
