// src/components/admin/AdminSidebar.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
const AdminSidebar = () => {
  const location = useLocation();
  const [revenueOpen, setRevenueOpen] = useState(false);

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: 'dashboard' },
    { name: 'My Profile', path: '/admin/profile', icon: 'user' },
    { name: 'Students', path: '/admin/students', icon: 'users' },
    { name: 'Tutors', path: '/admin/tutors', icon: 'chalkboard-teacher' },
    { name: 'Courses', path: '/admin/courses', icon: 'book' },
    {
      name: 'Revenue',
      path: '/admin/revenue',
      icon: 'chart-line',
      subItems: ['Debited', 'Credited'],
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="bg-admin-secondary text-white w-64 min-h-screen p-4">
      <div className="space-y-4">
        {menuItems.map((item) => (
          <div key={item.name}>
            {item.subItems ? (
              <div>
                <button
                  onClick={() => setRevenueOpen(!revenueOpen)}
                  className={`flex items-center w-full p-2 rounded ${
                    isActive(item.path) ? 'bg-admin-primary' : 'hover:bg-admin-primary'
                  }`}
                >
                  <i className={`fas fa-${item.icon} mr-2`}></i>
                  {item.name}
                  <svg
                    className={`w-4 h-4 ml-auto ${revenueOpen ? 'transform rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {revenueOpen && (
                  <div className="pl-4 mt-2 space-y-2">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem}
                        to={`${item.path}/${subItem.toLowerCase()}`}
                        className={`block p-2 rounded ${
                          isActive(`${item.path}/${subItem.toLowerCase()}`)
                            ? 'bg-admin-primary'
                            : 'hover:bg-admin-primary'
                        }`}
                      >
                        {subItem}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                to={item.path}
                className={`flex items-center p-2 rounded ${
                  isActive(item.path) ? 'bg-admin-primary' : 'hover:bg-admin-primary'
                }`}
              >
                <i className={`fas fa-${item.icon} mr-2`}></i>
                {item.name}
              </Link>
            )}
          </div>
        ))}
      </div>
      <div className="mt-auto pt-4">
        <button
          onClick={() => {/* Add logout logic here */}}
          className="flex items-center w-full p-2 rounded hover:bg-admin-primary"
        >
          <i className="fas fa-sign-out-alt mr-2"></i>
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;