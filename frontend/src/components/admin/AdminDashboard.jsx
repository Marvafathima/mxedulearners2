// src/components/AdminDashboard.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { adminLogout } from '../../store/adminAuthSlice';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(adminLogout());
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-admin-bg">
      <nav className="bg-admin-primary p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-white text-2xl font-bold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-white text-admin-primary px-4 py-2 rounded-md hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto mt-10 p-4">
        <h2 className="text-3xl font-bold text-admin-secondary mb-4">Welcome, Admin!</h2>
        {/* Add your admin dashboard content here */}
      </main>
    </div>
  );
};

export default AdminDashboard;