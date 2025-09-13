import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDiscounts() {
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ code: "", description: "", percentage: "", validFrom: "", validTo: "" });
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const fetchDiscounts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/discounts");
      setDiscounts(res.data);
    } catch (err) {
      setError("Failed to load discounts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDiscounts(); }, []);

  const handleEdit = (d) => {
    setEditingId(d._id);
    setForm({
      code: d.code,
      description: d.description,
      percentage: d.percentage,
      validFrom: d.validFrom ? d.validFrom.slice(0, 10) : "",
      validTo: d.validTo ? d.validTo.slice(0, 10) : "",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this discount?")) return;
    try {
      await axios.delete(`/api/discounts/${id}`);
      setSuccessMsg("Discount deleted.");
      fetchDiscounts();
    } catch {
      setError("Failed to delete discount");
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccessMsg("");
    const payload = {
      ...form,
      percentage: Number(form.percentage),
      validFrom: form.validFrom,
      validTo: form.validTo,
    };
    try {
      if (editingId) {
        await axios.put(`/api/discounts/${editingId}`, payload);
        setSuccessMsg("Discount updated.");
      } else {
        await axios.post("/api/discounts", payload);
        setSuccessMsg("Discount created.");
      }
      setEditingId(null);
      setForm({ code: "", description: "", percentage: "", validFrom: "", validTo: "" });
      fetchDiscounts();
    } catch {
      setError("Failed to save discount");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-indigo-700">Discounts Management</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {successMsg && <div className="text-green-600 mb-2">{successMsg}</div>}
      <form className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSave}>
        <input className="border p-2 rounded" placeholder="Code" value={form.code} onChange={e => setForm(f => ({ ...f, code: e.target.value }))} required />
        <input className="border p-2 rounded" placeholder="Description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
        <input className="border p-2 rounded" placeholder="Percentage" type="number" value={form.percentage} onChange={e => setForm(f => ({ ...f, percentage: e.target.value }))} required />
        <input className="border p-2 rounded" type="date" value={form.validFrom} onChange={e => setForm(f => ({ ...f, validFrom: e.target.value }))} required />
        <input className="border p-2 rounded" type="date" value={form.validTo} onChange={e => setForm(f => ({ ...f, validTo: e.target.value }))} required />
        <button className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white py-2 rounded font-semibold shadow hover:from-indigo-600 hover:to-blue-600 transition col-span-2" type="submit" disabled={saving}>{saving ? (editingId ? "Saving..." : "Creating...") : (editingId ? "Save Changes" : "Create Discount")}</button>
        {editingId && <button type="button" className="col-span-2 text-sm text-gray-500 underline" onClick={() => { setEditingId(null); setForm({ code: "", description: "", percentage: "", validFrom: "", validTo: "" }); }}>Cancel Edit</button>}
      </form>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-indigo-50">
              <th className="p-2 text-left">Code</th>
              <th className="p-2 text-left">Description</th>
              <th className="p-2 text-left">% Off</th>
              <th className="p-2 text-left">Valid From</th>
              <th className="p-2 text-left">Valid To</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {discounts.map(d => (
              <tr key={d._id} className="border-b">
                <td className="p-2">{d.code}</td>
                <td className="p-2">{d.description}</td>
                <td className="p-2">{d.percentage}%</td>
                <td className="p-2">{d.validFrom ? d.validFrom.slice(0, 10) : ""}</td>
                <td className="p-2">{d.validTo ? d.validTo.slice(0, 10) : ""}</td>
                <td className="p-2 flex gap-2">
                  <button className="text-blue-600 underline" onClick={() => handleEdit(d)}>Edit</button>
                  <button className="text-red-500 underline" onClick={() => handleDelete(d._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
