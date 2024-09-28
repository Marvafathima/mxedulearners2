import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../contexts/ThemeContext';

const TutorNavbar = ({ user }) => {
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Implement logout functionality here
    // For example: clear local storage, reset auth state, etc.
    // Then navigate to login page
    navigate('/login');
  };

  return (
     
    <nav className={`${darkMode ? 'bg-dark-gray-200' : 'bg-light-blueberry'} p-4`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-white">MXEduLearners</div>
        <div className="flex items-center">
          <div className="relative group">
          {user.profile_pic ? ( 
            <img
              src={user.profile_pic || '/path/to/default/image.png'}
              alt="Profile"
              className="w-10 h-10 rounded-full cursor-pointer"
            />):(
              <span>{user.username[0].toUpperCase()}</span>
            )}
            <div className={`absolute right-0 mt-2 w-48 ${
              darkMode ? 'bg-dark-gray-100' : 'bg-white'
            } rounded-md shadow-lg py-1 z-10 hidden group-hover:block`}>
              <button
                onClick={() => navigate('/tutor/profile')}
                className={`block px-4 py-2 text-sm ${
                  darkMode ? 'text-dark-white hover:bg-dark-gray-200' : 'text-gray-700 hover:bg-gray-100'
                } w-full text-left`}
              >
                My Profile
              </button>
              <button
                onClick={handleLogout}
                className={`block px-4 py-2 text-sm ${
                  darkMode ? 'text-dark-white hover:bg-dark-gray-200' : 'text-gray-700 hover:bg-gray-100'
                } w-full text-left`}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TutorNavbar;