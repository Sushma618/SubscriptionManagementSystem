import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminPlans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingPlan, setEditingPlan] = useState(null);
  const [form, setForm] = useState({ name: "", productType: "Fibernet", features: "", quota: "", price: "" });
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/plans");
      setPlans(res.data);
    } catch (err) {
      setError("Failed to load plans");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPlans(); }, []);

  const handleEdit = (plan) => {
    setEditingPlan(plan._id);
    setForm({
      name: plan.name,
      productType: plan.productType,
      features: plan.features.join(", "),
      quota: plan.quota,
      price: plan.price,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this plan?")) return;
    try {
      await axios.delete(`/api/plans/${id}`);
      setSuccessMsg("Plan deleted.");
      fetchPlans();
    } catch {
      setError("Failed to delete plan");
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccessMsg("");
    const payload = {
      ...form,
      features: form.features.split(",").map(f => f.trim()).filter(Boolean),
      quota: Number(form.quota),
      price: Number(form.price),
    };
    try {
      if (editingPlan) {
        await axios.put(`/api/plans/${editingPlan}`, payload);
        setSuccessMsg("Plan updated.");
      } else {
        await axios.post("/api/plans", payload);
        setSuccessMsg("Plan created.");
      }
      setEditingPlan(null);
      setForm({ name: "", productType: "Fibernet", features: "", quota: "", price: "" });
      fetchPlans();
    } catch {
      setError("Failed to save plan");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-indigo-700">Plans Management</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {successMsg && <div className="text-green-600 mb-2">{successMsg}</div>}
      <form className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSave}>
        <input className="border p-2 rounded" placeholder="Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
        <select className="border p-2 rounded" value={form.productType} onChange={e => setForm(f => ({ ...f, productType: e.target.value }))}>
          <option value="Fibernet">Fibernet</option>
          <option value="Broadband Copper">Broadband Copper</option>
        </select>
        <input className="border p-2 rounded col-span-2" placeholder="Features (comma separated)" value={form.features} onChange={e => setForm(f => ({ ...f, features: e.target.value }))} required />
        <input className="border p-2 rounded" placeholder="Quota (GB/mo)" type="number" value={form.quota} onChange={e => setForm(f => ({ ...f, quota: e.target.value }))} required />
        <input className="border p-2 rounded" placeholder="Price (₹)" type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} required />
        <button className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white py-2 rounded font-semibold shadow hover:from-indigo-600 hover:to-blue-600 transition col-span-2" type="submit" disabled={saving}>{saving ? (editingPlan ? "Saving..." : "Creating...") : (editingPlan ? "Save Changes" : "Create Plan")}</button>
        {editingPlan && <button type="button" className="col-span-2 text-sm text-gray-500 underline" onClick={() => { setEditingPlan(null); setForm({ name: "", productType: "Fibernet", features: "", quota: "", price: "" }); }}>Cancel Edit</button>}
      </form>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-indigo-50">
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Type</th>
              <th className="p-2 text-left">Features</th>
              <th className="p-2 text-left">Quota</th>
              <th className="p-2 text-left">Price</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {plans.map(plan => (
              <tr key={plan._id} className="border-b">
                <td className="p-2">{plan.name}</td>
                <td className="p-2">{plan.productType}</td>
                <td className="p-2">{plan.features.join(", ")}</td>
                <td className="p-2">{plan.quota} GB</td>
                <td className="p-2">₹{plan.price}</td>
                <td className="p-2 flex gap-2">
                  <button className="text-blue-600 underline" onClick={() => handleEdit(plan)}>Edit</button>
                  <button className="text-red-500 underline" onClick={() => handleDelete(plan._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
