import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";

export default function UserRecommendations() {
  const [recs, setRecs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRecs() {
      try {
        setLoading(true);
        const res = await axios.get("/api/recommendations");
        setRecs(res.data);
      } catch {
        setError("Failed to load recommendations");
      } finally {
        setLoading(false);
      }
    }
    fetchRecs();
  }, []);

  if (loading) return <div className="text-center py-8">Loading recommendations...</div>;
  if (error) return <div className="text-center text-red-500 py-8">{error}</div>;

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-indigo-700">Recommended for You</h2>
      {recs.length === 0 ? (
        <div className="text-gray-500">No recommendations at this time.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recs.map((plan) => (
            <div key={plan._id} className="bg-indigo-50 rounded-xl shadow p-6 flex flex-col gap-2 border border-indigo-200">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg font-semibold text-indigo-600">{plan.name}</span>
                <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded">{plan.productType}</span>
              </div>
              <ul className="text-sm text-gray-600 mb-2 list-disc list-inside">
                {plan.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
              <div className="flex items-center justify-between mt-2">
                <span className="text-indigo-700 font-bold text-lg">₹{plan.price}</span>
                <span className="text-xs text-gray-500">Quota: {plan.quota}GB/mo</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
