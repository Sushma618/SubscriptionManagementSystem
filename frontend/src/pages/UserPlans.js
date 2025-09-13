import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";

export default function UserPlans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subscribing, setSubscribing] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    async function fetchPlans() {
      try {
        setLoading(true);
        const res = await axios.get("/api/plans");
        setPlans(res.data);
      } catch (err) {
        setError("Failed to load plans");
      } finally {
        setLoading(false);
      }
    }
    fetchPlans();
  }, []);


  if (loading) return <div className="text-center py-8">Loading plans...</div>;
  if (error) return <div className="text-center text-red-500 py-8">{error}</div>;
  if (successMsg) return <div className="text-center text-green-600 py-8 font-semibold">{successMsg}</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-indigo-700">Available Plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plans.map((plan) => (
          <div key={plan._id} className="bg-white rounded-xl shadow p-6 flex flex-col gap-2 border border-indigo-100">
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
            <button
              className="mt-4 bg-gradient-to-r from-indigo-500 to-blue-500 text-white py-2 rounded-lg font-semibold shadow hover:from-indigo-600 hover:to-blue-600 transition disabled:opacity-60"
              disabled={subscribing === plan._id}
              onClick={async () => {
                setSubscribing(plan._id);
                setError("");
                setSuccessMsg("");
                try {
                  await axios.post("/api/subscriptions/subscribe", { planId: plan._id, autoRenew: true });
                  setSuccessMsg("Successfully subscribed to " + plan.name + "!");
                } catch (err) {
                  setError("Failed to subscribe. " + (err.response?.data?.message || ""));
                } finally {
                  setSubscribing("");
                }
              }}
            >
              {subscribing === plan._id ? "Subscribing..." : "Subscribe"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
