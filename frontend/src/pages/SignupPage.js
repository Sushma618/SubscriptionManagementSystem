import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    role: 'user',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axios.post('/api/auth/register', { ...form, status: 'active' });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-white">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-indigo-700 mb-4 tracking-tight">Sign Up</h2>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full mb-3 p-2 border rounded" required />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="w-full mb-3 p-2 border rounded" required />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" className="w-full mb-3 p-2 border rounded" required />
        <input name="password" value={form.password} onChange={handleChange} placeholder="Password" type="password" className="w-full mb-3 p-2 border rounded" required />
        <div className="mb-3">
          <label className="mr-2">Role:</label>
          <select name="role" value={form.role} onChange={handleChange} className="border rounded p-1">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition">
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
        <div className="mt-4 text-sm text-center">
          Already have an account? <a href="/login" className="text-indigo-600 hover:underline">Login</a>
        </div>
      </form>
    </div>
  );
}

export default SignupPage;
