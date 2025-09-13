import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slices/userSlice";

export default function Layout({ children }) {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <header className="bg-white shadow-md py-4 px-4 md:px-8 flex items-center justify-between relative">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-indigo-700 tracking-tight">LUMEN Quest 2.0</span>
        </div>
        <button className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400" onClick={() => setMenuOpen(m => !m)}>
          <span className="sr-only">Toggle menu</span>
          <svg className="w-6 h-6 text-indigo-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
        <nav className={`flex-col md:flex-row md:flex gap-6 text-indigo-600 font-medium items-center absolute md:static top-full left-0 w-full md:w-auto bg-white md:bg-transparent shadow md:shadow-none z-20 transition-all ${menuOpen ? 'flex' : 'hidden md:flex'}`}>
          {!user && <Link to="/login" className="hover:text-indigo-900 transition block md:inline" onClick={() => setMenuOpen(false)}>Login</Link>}
          {user?.role === "user" && (
            <>
              <Link to="/user" className="hover:text-indigo-900 transition block md:inline" onClick={() => setMenuOpen(false)}>Dashboard</Link>
              <Link to="/user/plans" className="hover:text-indigo-900 transition block md:inline" onClick={() => setMenuOpen(false)}>Plans</Link>
              <Link to="/user/subscriptions" className="hover:text-indigo-900 transition block md:inline" onClick={() => setMenuOpen(false)}>Subscriptions</Link>
              <Link to="/user/recommendations" className="hover:text-indigo-900 transition block md:inline" onClick={() => setMenuOpen(false)}>Recommendations</Link>
              <Link to="/user/notifications" className="hover:text-indigo-900 transition block md:inline" onClick={() => setMenuOpen(false)}>Notifications</Link>
              <button onClick={() => { setMenuOpen(false); handleLogout(); }} className="mt-2 md:mt-0 md:ml-4 px-3 py-1 bg-indigo-100 rounded hover:bg-indigo-200 text-indigo-700 font-semibold transition block md:inline">Logout</button>
            </>
          )}
          {user?.role === "admin" && (
            <>
              <Link to="/admin" className="hover:text-indigo-900 transition block md:inline" onClick={() => setMenuOpen(false)}>Admin Dashboard</Link>
              <Link to="/admin/plans" className="hover:text-indigo-900 transition block md:inline" onClick={() => setMenuOpen(false)}>Plans</Link>
              <Link to="/admin/discounts" className="hover:text-indigo-900 transition block md:inline" onClick={() => setMenuOpen(false)}>Discounts</Link>
              <Link to="/admin/analytics" className="hover:text-indigo-900 transition block md:inline" onClick={() => setMenuOpen(false)}>Analytics</Link>
              <Link to="/admin/logs" className="hover:text-indigo-900 transition block md:inline" onClick={() => setMenuOpen(false)}>Logs</Link>
              <button onClick={() => { setMenuOpen(false); handleLogout(); }} className="mt-2 md:mt-0 md:ml-4 px-3 py-1 bg-indigo-100 rounded hover:bg-indigo-200 text-indigo-700 font-semibold transition block md:inline">Logout</button>
            </>
          )}
        </nav>
      </header>
      <main className="flex-1 w-full max-w-5xl mx-auto py-8 px-2 md:px-4">
        {children}
      </main>
      <footer className="bg-white text-center py-4 text-indigo-500 text-sm shadow-inner">
        &copy; {new Date().getFullYear()} LUMEN Quest 2.0 – Subscription Management System
      </footer>
    </div>
  );
}
