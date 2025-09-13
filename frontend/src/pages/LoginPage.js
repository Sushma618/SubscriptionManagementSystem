import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setUser, setLoading, setError } from '../slices/userSlice';

function LoginPage() {
  const [role, setRole] = React.useState('user');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showSignup, setShowSignup] = React.useState(false);
  const [signupForm, setSignupForm] = React.useState({ name: '', phone: '', email: '', password: '', role: 'user' });
  const [signupError, setSignupError] = React.useState('');
  const [signupLoading, setSignupLoading] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(state => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const res = await axios.post('/api/auth/login', { email, password, role });
      dispatch(setUser(res.data));
      if (res.data.user.role === 'admin') navigate('/admin');
      else navigate('/user');
    } catch (err) {
      dispatch(setError(err.response?.data?.message || 'Login failed'));
      setShowSignup(true);
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Validation for signup
  const validateSignup = () => {
    if (!signupForm.name.trim()) return 'Name is required';
    if (!/^\d{10}$/.test(signupForm.phone)) return 'Mobile number must be 10 digits';
    if (!/^[A-Za-z0-9._%+-]+@gmail\.com$/.test(signupForm.email)) return 'Email must be in the format: user@gmail.com';
    if (signupForm.password.length < 8) return 'Password must be at least 8 characters';
    if (!/[A-Z]/.test(signupForm.password)) return 'Password must contain at least one uppercase letter';
    if (!/[a-z]/.test(signupForm.password)) return 'Password must contain at least one lowercase letter';
    if (!/\d/.test(signupForm.password)) return 'Password must contain at least one number';
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(signupForm.password)) return 'Password must contain at least one special character';
    if (!signupForm.role) return 'Role is required';
    return '';
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setSignupLoading(true);
    setSignupError('');
    const validationError = validateSignup();
    if (validationError) {
      setSignupError(validationError);
      setSignupLoading(false);
      return;
    }
    try {
      await axios.post('/api/auth/register', { ...signupForm, status: 'active' });
      setShowSignup(false);
      setRole('user');
      setEmail('');
      setPassword('');
      alert('Signup successful! Please login.');
    } catch (err) {
      setSignupError(err.response?.data?.message || 'Signup failed');
    }
    setSignupLoading(false);
  };

  const handleSignupChange = (e) => {
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 via-blue-100 to-white px-4">
      <div className="w-full max-w-md bg-white/95 rounded-3xl shadow-2xl border border-indigo-100 p-10 flex flex-col items-center">
        {/* Logo, title, and subtitle always visible */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-gradient-to-tr from-indigo-500 to-blue-400 p-4 rounded-full shadow-lg mb-3">
            <img src="https://img.icons8.com/color/96/000000/internet--v2.png" alt="LUMEN Logo" className="w-16 h-16" />
          </div>
          <h1 className="text-4xl font-extrabold text-indigo-700 mb-1 tracking-tight text-center">LUMEN Quest</h1>
          <p className="text-indigo-400 text-base font-medium text-center">Subscription Management System</p>
        </div>
        {/* Show login or signup form */}
        {!showSignup ? (
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
            <h2 className="text-xl font-bold text-indigo-700 mb-2">Login</h2>
            {/* Role radio buttons above email/password */}
            <div className="mb-2 flex items-center gap-4 justify-center">
              <label className="mr-2 font-semibold text-indigo-700">Login as</label>
              <label className="flex items-center gap-1">
                <input type="radio" name="role" value="admin" checked={role === 'admin'} onChange={() => setRole('admin')} /> Admin
              </label>
              <label className="flex items-center gap-1">
                <input type="radio" name="role" value="user" checked={role === 'user'} onChange={() => setRole('user')} /> User
              </label>
            </div>
            <input name="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" className="w-full mb-2 p-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none" required />
            <input name="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" className="w-full mb-2 p-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none" required />
            {error && <div className="text-red-600 mb-2">{error}</div>}
            <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold shadow hover:bg-indigo-700 transition" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
            <button type="button" className="w-full mt-2 text-indigo-500 underline" onClick={() => setShowSignup(true)}>Sign Up</button>
          </form>
        ) : (
          <form onSubmit={handleSignup} className="w-full flex flex-col gap-6">
            <h2 className="text-xl font-bold text-indigo-700 mb-2">Sign Up</h2>
            {/* Role radio buttons above all fields */}
            <div className="mb-2 flex items-center gap-4 justify-center">
              <label className="mr-2 font-semibold text-indigo-700">Sign up as</label>
              <label className="flex items-center gap-1">
                <input type="radio" name="role" value="user" checked={signupForm.role === 'user'} onChange={handleSignupChange} /> User
              </label>
              <label className="flex items-center gap-1">
                <input type="radio" name="role" value="admin" checked={signupForm.role === 'admin'} onChange={handleSignupChange} /> Admin
              </label>
            </div>
            <input name="name" value={signupForm.name} onChange={handleSignupChange} placeholder="Name" className="w-full mb-2 p-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none" required />
            <input name="phone" value={signupForm.phone} onChange={handleSignupChange} placeholder="Phone" className="w-full mb-2 p-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none" required />
            <input name="email" value={signupForm.email} onChange={handleSignupChange} placeholder="Email" type="email" className="w-full mb-2 p-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none" required />
            <input name="password" value={signupForm.password} onChange={handleSignupChange} placeholder="Password" type="password" className="w-full mb-2 p-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none" required />
            {signupError && <div className="text-red-600 mb-2">{signupError}</div>}
            <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold shadow hover:bg-indigo-700 transition" disabled={signupLoading}>
              {signupLoading ? 'Signing up...' : 'Sign Up'}
            </button>
            <button type="button" className="w-full mt-2 text-indigo-500 underline" onClick={() => setShowSignup(false)}>Back to Login</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
