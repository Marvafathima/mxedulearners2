

import React, { useEffect,useRef,useContext,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTutorDetails } from '../../store/authSlice';
import { ThemeContext } from '../../contexts/ThemeContext';
const TutorHome = () => {
  const { darkMode } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current === false) {
      if (user && user.role === 'tutor') {
        dispatch(fetchTutorDetails());
      }
      return () => {
        effectRan.current = true;
      };
    }
  }, [dispatch, user]);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user data available</div>;
  const sidebarItems = [
    { name: 'Dashboard', icon: 'fas fa-tachometer-alt' },
    { name: 'My Profile', icon: 'fas fa-user' },
    { name: 'Students', icon: 'fas fa-users' },
    { name: 'Courses', icon: 'fas fa-book' },
    { name: 'Schedule', icon: 'fas fa-calendar-alt' },
    { name: 'Chat', icon: 'fas fa-comments' },
    { name: 'Revenue', icon: 'fas fa-chart-line' },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (


<div className={`flex h-screen ${darkMode ? 'bg-dark-gray-300' : 'bg-light-applecore'}`}>
      {/* Sidebar */}
      <div className={`w-64 ${darkMode ? 'bg-dark-gray-200' : 'bg-light-blueberry'} text-white p-4`}>
        <div className="text-2xl font-bold mb-8">MXEduLearners</div>
        {sidebarItems.map((item, index) => (
          <div key={index} className={`flex items-center mb-4 cursor-pointer ${darkMode ? 'hover:bg-dark-gray-100' : 'hover:bg-light-apricot'} p-2 rounded`}>
            <i className={`${item.icon} mr-3`}></i>
            <span>{item.name}</span>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className={`rounded-lg shadow-md p-6 ${darkMode ? 'bg-dark-gray-200' : 'bg-white'}`}>
          {/* Profile Header */}
          <div className="relative mb-6">
            <div className={`h-32 ${darkMode ? 'bg-dark-gray-100' : 'bg-light-citrus'} rounded-t-lg`}></div>
            <div className="absolute bottom-0 left-6 transform translate-y-1/2">
              {/* <div className="relative">
                <img
                src={profilePicUrl} alt="Profile"
                  className="w-24 h-24 rounded-full border-4 border-white object-cover"
                />
                <button
                  onClick={() => setShowProfileOptions(!showProfileOptions)}
                  className={`absolute bottom-0 right-0 ${darkMode ? 'bg-dark-gray-100' : 'bg-light-apricot'} text-white rounded-full w-8 h-8 flex items-center justify-center`}
                >
                  <i className="fas fa-plus"></i>
                </button>
                {showProfileOptions && (
                  <div className={`absolute right-0 mt-2 w-48 ${darkMode ? 'bg-dark-gray-100' : 'bg-white'} rounded-md shadow-lg py-1 z-10`}>
                    <label className={`block px-4 py-2 text-sm ${darkMode ? 'text-dark-white hover:bg-dark-gray-200' : 'text-gray-700 hover:bg-gray-100'} cursor-pointer`}>
                      Change Profile Pic
                      <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
                    </label>
                  </div>
                )}
              </div> */}
            </div>
          </div>

          {/* Tutor Details */}
          <div className="mt-16 grid grid-cols-2 gap-4">
            <div>
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-dark-white' : 'text-light-blueberry'}`}>
                {user.username}
              </h2>
              <p className={`${darkMode ? 'text-dark-white' : 'text-light-apricot'}`}>{user.role} {user.is_approved ? '(Approved)' : user.is_rejected ? '(Rejected)' : '(Pending)'}</p>
              <p className="mt-2"><i className="fas fa-envelope mr-2"></i>{user.email}</p>
              <p><i className="fas fa-phone mr-2"></i>{user.phone_number}</p>
            </div>
            <div>
              <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-dark-white' : 'text-light-blueberry'}`}>Education</h3>
              <p className={`${darkMode ? 'text-dark-gray-100' : 'text-light-apricot'}`}>{user.tutor_application?.education_qualification}</p>
              
              <h3 className={`text-xl font-semibold mb-2 mt-4 ${darkMode ? 'text-dark-white' : 'text-light-blueberry'}`}>Experience</h3>
              <p className={`${darkMode ? 'text-dark-gray-100' : 'text-light-apricot'}`}>{user.tutor_application?.job_experience}</p>
            </div>
          </div>

          {/* Change Password Section */}
          <div className="mt-8">
            <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-dark-white' : 'text-light-blueberry'}`}>Change Password</h3>
            <form className="space-y-4">
              <input type="password" placeholder="Current Password" className={`w-full p-2 border rounded ${darkMode ? 'bg-dark-gray-100 text-dark-white' : 'bg-white text-light-blueberry'}`} />
              <input type="password" placeholder="New Password" className={`w-full p-2 border rounded ${darkMode ? 'bg-dark-gray-100 text-dark-white' : 'bg-white text-light-blueberry'}`} />
              <input type="password" placeholder="Confirm New Password" className={`w-full p-2 border rounded ${darkMode ? 'bg-dark-gray-100 text-dark-white' : 'bg-white text-light-blueberry'}`} />
              <button type="submit" className={`${darkMode ? 'bg-dark-gray-100 text-dark-white hover:bg-dark-gray-200' : 'bg-light-citrus text-white hover:bg-light-apricot'} px-4 py-2 rounded transition-colors`}>Change Password</button>
            </form>
          </div>
        </div>
      </div>
    </div>



    // <div className="p-8">
    //   <h1 className="text-2xl font-bold mb-4">Welcome, {user.username}!</h1>
    //   <div className="mb-4">
    //     <p><strong>Email:</strong> {user.email}</p>
    //     <p><strong>Phone:</strong> {user.phone_number}</p>
    //     <p><strong>Role:</strong> {user.role}</p>
    //     <p><strong>Status:</strong> {user.is_approved ? 'Approved' : user.is_rejected ? 'Rejected' : 'Pending'}</p>
    //   </div>
    //   {user.tutor_application && (
    //     <div>
    //       <h2 className="text-xl font-bold mb-2">Tutor Details</h2>
    //       <p><strong>Education:</strong> {user.tutor_application.education_qualification}</p>
    //       <p><strong>Experience:</strong> {user.tutor_application.job_experience}</p>
    //     </div>
    //   )}
    // </div>
  );
};

export default TutorHome;