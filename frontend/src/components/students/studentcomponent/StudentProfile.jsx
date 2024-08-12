// src/components/student/StudentProfile.js
import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { fetchStudentProfile } from '../../../store/authSlice';
import ProfileSidebar from './ProfileSidebar';
import Navbar from './Navbar';
const StudentProfile = () => {
  const { darkMode } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchStudentProfile());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

  return (
    <>
    <Navbar user={user}/>
    <div className={`flex ${darkMode ? 'bg-dark-gray-300 text-dark-white' : 'bg-light-blueberry-100 text-gray-900'}`}>
     
      <ProfileSidebar />
      <div className="flex-grow p-8">
        {/* <h1 className="text-3xl font-bold mb-6">My Profile</h1> */}
        <div className={`bg-${darkMode ? 'dark-gray-200' :'light-blueberry text-white' } rounded-lg shadow-md p-6`}>
          <div className={`flex items-center mb-6 ${darkMode ? 'bg-dark-gray-200 text-dark-white' : 'bg-light-blueberry text-white'} `}>
            <img
              src={user.profile_pic || 'https://via.placeholder.com/150'}
              alt={user.username}
              className="w-24 h-24 rounded-full mr-6"
            />
            <div>
              <h2 className="text-2xl font-semibold">{user.username}</h2>
              <p className="text-gray-600">{user.email}</p>
              <h3 className="font-semibold mb-2">Phone: {user.phone_number}</h3>

            </div>
          </div>
          {/* <div className={`grid grid-cols-2 gap-4 ${darkMode ? 'bg-dark-gray-200 text-dark-white' : 'bg-light-blueberry text-white'}`}>
             */}
            {/* <div>
              <h3 className="font-semibold mb-2">Phone</h3>
              <p>{user.phone_number}</p>
            </div> */}
            {/* <div>
              <h3 className="font-semibold mb-2">Date Joined</h3>
              <p>{new Date(user.date_joined).toLocaleDateString()}</p>
           </div> */}
     {/* </div> */}
        </div>
      </div>
    </div>
    </>
  );
};

export default StudentProfile;