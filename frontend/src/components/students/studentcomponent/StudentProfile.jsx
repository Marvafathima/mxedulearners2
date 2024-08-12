// // src/components/student/StudentProfile.js
// import React, { useContext, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { ThemeContext } from '../../../contexts/ThemeContext';
// import { fetchStudentProfile } from '../../../store/authSlice';
// import ProfileSidebar from './ProfileSidebar';
// import Navbar from './Navbar';
// import { FaRankingStar, FaBookOpen, FaTrophy, FaPlus } from 'react-icons/fa6';
// import { FaQuestionCircle } from 'react-icons/fa';
// const StudentProfile = () => {
//   const { darkMode } = useContext(ThemeContext);
//   const dispatch = useDispatch();
//   const { user, loading, error } = useSelector((state) => state.auth);

//   useEffect(() => {
//     dispatch(fetchStudentProfile());
//   }, [dispatch]);

//   if (loading) return <div>Loading...</div>;
// //   if (error) return <div>Error: {error}</div>;

//   return (
//     <>
//     <Navbar user={user}/>
//     <div className={`flex ${darkMode ? 'bg-dark-gray-300 text-dark-white' : 'bg-light-blueberry-100 text-gray-900'}`}>
     
//       <ProfileSidebar />
//       <div className="flex-grow p-8">
//         {/* <h1 className="text-3xl font-bold mb-6">My Profile</h1> */}
//         <div className={`bg-${darkMode ? 'dark-gray-200' :'light-blueberry text-white' } rounded-lg shadow-md p-6`}>
//           <div className={`flex items-center mb-6 ${darkMode ? 'bg-dark-gray-200 text-dark-white' : 'bg-light-blueberry text-white'} `}>
//             <img
//               src={user.profile_pic || 'https://via.placeholder.com/150'}
//               alt={user.username}
//               className="w-24 h-24 rounded-full mr-6"
//             />
//             <div>
//               <h2 className="text-2xl font-semibold">{user.username}</h2>
//               <p className="text-gray-600">{user.email}</p>
//               <h3 className="font-semibold mb-2">Phone: {user.phone_number}</h3>

//             </div>
//           </div>
//           {/* <div className={`grid grid-cols-2 gap-4 ${darkMode ? 'bg-dark-gray-200 text-dark-white' : 'bg-light-blueberry text-white'}`}>
//              */}
//             {/* <div>
//               <h3 className="font-semibold mb-2">Phone</h3>
//               <p>{user.phone_number}</p>
//             </div> */}
//             {/* <div>
//               <h3 className="font-semibold mb-2">Date Joined</h3>
//               <p>{new Date(user.date_joined).toLocaleDateString()}</p>
//            </div> */}
//      {/* </div> */}
//         </div>
//       </div>
//     </div>
//     </>
//   );
// };

// export default StudentProfile;
// import React, { useContext, useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { ThemeContext } from '../../../contexts/ThemeContext';
// import { fetchStudentProfile } from '../../../store/authSlice';
// import ProfileSidebar from './ProfileSidebar';
// import Navbar from './Navbar';
// import { FaRankingStar, FaBookOpen, FaTrophy, FaPlus } from 'react-icons/fa6';
// import { FaQuestionCircle } from 'react-icons/fa';

// const StudentProfile = () => {
//   const { darkMode } = useContext(ThemeContext);
//   const dispatch = useDispatch();
//   const { user, loading, error } = useSelector((state) => state.auth);
//   const [activeForm, setActiveForm] = useState(null);

//   useEffect(() => {
//     dispatch(fetchStudentProfile());
//   }, [dispatch]);

//   if (loading) return <div>Loading...</div>;
// //   if (error) return <div>Error: {error}</div>;

//   const statsData = [
//     { icon: <FaRankingStar />, label: 'Rank', value:'10'},
//     { icon: <FaBookOpen />, label: 'Courses Purchased', value: '5' },
//     { icon: <FaQuestionCircle />, label: 'Quiz Taken', value: '15' },
//     { icon: <FaTrophy />, label: 'Score', value: '85%' },
//   ];

//   return (
//     <>
//       <Navbar user={user} />
//       <div className={`flex ${darkMode ? 'bg-dark-gray-300 text-dark-white' : 'bg-light-blueberry-100 text-gray-900'}`}>
//         <ProfileSidebar />
//         <div className="flex-grow p-8">
//           <div className={`bg-${darkMode ? 'dark-gray-200' : 'light-blueberry'} rounded-lg shadow-md p-6`}>
//             <div className={`flex items-center mb-6 ${darkMode ? 'text-dark-white' : 'text-white'}`}>
//               <div className="relative">
//                 <img
//                   src={user.profile_pic || 'https://via.placeholder.com/150'}
//                   alt={user.username}
//                   className="w-24 h-24 rounded-full mr-6"
//                 />
//                 <button className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1">
//                   <FaPlus className="text-white" />
//                 </button>
//               </div>
//               <div>
//                 <h2 className="text-2xl font-semibold">{user.username}</h2>
//                 <p className={`${darkMode ? 'text-gray-400' : 'text-gray-200'}`}>{user.email}</p>
//                 <h3 className="font-semibold mb-2">Phone: {user.phone_number}</h3>
//               </div>
//             </div>
//             <div className="grid grid-cols-4 gap-4 mt-6">
//               {statsData.map((stat, index) => (
//                 <div key={index} className={`${darkMode ? 'bg-dark-gray-300' : 'bg-white'} p-4 rounded-lg shadow text-center`}>
//                   <div className={`text-3xl mb-2 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`}>{stat.icon}</div>
//                   <div className={`font-semibold ${darkMode ? 'text-dark-white' : 'text-gray-800'}`}>{stat.label}</div>
//                   <div className={`text-lg ${darkMode ? 'text-blue-400' : 'text-blue-500'}`}>{stat.value}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div className="mt-8 flex space-x-4">
//             <button
//               onClick={() => setActiveForm('editProfile')}
//               className={`flex-1 py-2 px-4 rounded ${
//                 activeForm === 'editProfile'
//                   ? 'bg-blue-500 text-white'
//                   : `${darkMode ? 'bg-dark-gray-200 text-dark-white' : 'bg-light-cyan text-gray-800'}`
//               }`}
//             >
//               Edit Profile
//             </button>
//             <button
//               onClick={() => setActiveForm('resetPassword')}
//               className={`flex-1 py-2 px-4 rounded ${
//                 activeForm === 'resetPassword'
//                   ? 'bg-blue-500 text-white'
//                   : `${darkMode ? 'bg-dark-gray-200 text-dark-white' : 'bg-light-cyan text-gray-800'}`
//               }`}
//             >
//               Reset Password
//             </button>
//           </div>
//           {activeForm === 'editProfile' && (
//             <form className={`mt-4 ${darkMode ? 'bg-dark-gray-200' : 'bg-light-darkcyan'} p-6 rounded-lg shadow`}>
//               <div className="mb-4">
//                 <label className="block mb-2">Username</label>
//                 <input type="text" defaultValue={user.username} className="w-full p-2 border rounded" />
//               </div>
//               <div className="mb-4">
//                 <label className="block mb-2">Email</label>
//                 <input type="email" defaultValue={user.email} className="w-full p-2 border rounded" />
//               </div>
//               <div className="mb-4">
//                 <label className="block mb-2">Phone Number</label>
//                 <input type="tel" defaultValue={user.phone_number} className="w-full p-2 border rounded" />
//               </div>
//               <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
//                 Save Changes
//               </button>
//             </form>
//           )}
//           {activeForm === 'resetPassword' && (
//             <form className={`mt-4 ${darkMode ? 'bg-dark-gray-200' : 'bg-light-darkcyan'} p-6 rounded-lg shadow`}>
//               <div className="mb-4">
//                 <label className="block mb-2">Old Password</label>
//                 <input type="password" className="w-full p-2 border rounded" />
//               </div>
//               <div className="mb-4">
//                 <label className="block mb-2">New Password</label>
//                 <input type="password" className="w-full p-2 border rounded" />
//               </div>
//               <div className="mb-4">
//                 <label className="block mb-2">Confirm New Password</label>
//                 <input type="password" className="w-full p-2 border rounded" />
//               </div>
//               <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
//                 Reset Password
//               </button>
//             </form>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default StudentProfile;
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { fetchStudentProfile, updateProfile, updateProfilePicture } from '../../../store/authSlice';
import ProfileSidebar from './ProfileSidebar';
import Navbar from './Navbar';
import { FaRankingStar, FaBookOpen, FaTrophy, FaPlus, FaTrash } from 'react-icons/fa6';
import { FaQuestionCircle } from 'react-icons/fa';
import { getCurrentUserTokens, getFullImageUrl } from '../../../utils/auth';
import { toast } from 'react-toastify';
const StudentProfile = () => {
  const { darkMode } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  const [activeForm, setActiveForm] = useState(null);
  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
    phone_number: '',
  });

  useEffect(() => {
    dispatch(fetchStudentProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setProfileData({
        username: user.username,
        email: user.email,
        phone_number: user.phone_number,
      });
    }
  }, [user]);

  if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

  const statsData = [
    { icon: <FaRankingStar />, label: 'Rank', value: '10' },
    { icon: <FaBookOpen />, label: 'Courses Purchased', value: '5' },
    { icon: <FaQuestionCircle />, label: 'Quiz Taken', value: '15' },
    { icon: <FaTrophy />, label: 'Score', value: '85%' },
  ];

  const handleInputChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const result=await dispatch(updateProfile(profileData));
    if (updateProfile.fulfilled.match(result)){
      toast.success("Successfully updated your profile")  
    }
   
   
    // setActiveForm(null);
  };

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('profile_pic', file);
      await dispatch(updateProfilePicture(formData));
    }
  };

  const handleRemoveProfilePicture = async () => {
    const formData = new FormData();
    formData.append('profile_pic', '');
    await dispatch(updateProfilePicture(formData));
  };

  return (
    <>
      <Navbar user={user} />
      <div className={`flex ${darkMode ? 'bg-dark-gray-300 text-dark-white' : 'bg-light-blueberry-100 text-gray-900'}`}>
        <ProfileSidebar />
        <div className="flex-grow p-8">
          <div className={`bg-${darkMode ? 'dark-gray-200' : 'light-blueberry'} rounded-lg shadow-md p-6`}>
            <div className={`flex items-center mb-6 ${darkMode ? 'text-dark-white' : 'text-white'}`}>
              <div className="relative">
                <img
                  src={getFullImageUrl(user.profile_pic) || 'https://via.placeholder.com/150'}
                  alt={user.username}
                  className="w-24 h-24 rounded-full mr-6"
                />
                <label htmlFor="profile-pic-input" className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1 cursor-pointer">
                  <FaPlus className="text-white" />
                </label>
                <input
                  id="profile-pic-input"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleProfilePictureChange}
                />
                {user.profile_pic && (
                  <button
                    onClick={handleRemoveProfilePicture}
                    className="absolute top-0 right-0 bg-red-500 rounded-full p-1"
                  >
                    <FaTrash className="text-white" />
                  </button>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-semibold">{user.username}</h2>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-200'}`}>{user.email}</p>
                <h3 className="font-semibold mb-2">Phone: {user.phone_number}</h3>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4 mt-6">
              {statsData.map((stat, index) => (
                <div key={index} className={`${darkMode ? 'bg-dark-gray-300' : 'bg-white'} p-4 rounded-lg shadow text-center`}>
                  <div className={`text-3xl mb-2 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`}>{stat.icon}</div>
                  <div className={`font-semibold ${darkMode ? 'text-dark-white' : 'text-gray-800'}`}>{stat.label}</div>
                  <div className={`text-lg ${darkMode ? 'text-blue-400' : 'text-blue-500'}`}>{stat.value}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 flex space-x-4 justify-center">
            <button
              onClick={() => setActiveForm('editProfile')}
              className={`py-2 px-4 rounded ${
                activeForm === 'editProfile'
                  ? 'bg-blue-500 text-white'
                  : `${darkMode ? 'bg-dark-gray-200 text-dark-white' : 'bg-light-cyan text-gray-800'}`
              }`}
            >
              Edit Profile
            </button>
            <button
              onClick={() => setActiveForm('resetPassword')}
              className={`py-2 px-4 rounded ${
                activeForm === 'resetPassword'
                  ? 'bg-blue-500 text-white'
                  : `${darkMode ? 'bg-dark-gray-200 text-dark-white' : 'bg-light-cyan text-gray-800'}`
              }`}
            >
              Reset Password
            </button>
          </div>
          <div className="flex justify-center mt-4">
            {activeForm === 'editProfile' && (
              <form onSubmit={handleProfileUpdate} className={`w-1/2 mt-4 ${darkMode ? 'bg-dark-gray-200' : 'bg-light-darkcyan'} p-6 rounded-lg shadow`}>
                <div className="mb-4">
                  <label className="block mb-2">Username</label>
                  <input type="text" name="username" value={profileData.username} onChange={handleInputChange} className="w-full p-2 border rounded" />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Email</label>
                  <input type="email" name="email" value={profileData.email} onChange={handleInputChange} className="w-full p-2 border rounded" />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Phone Number</label>
                  <input type="tel" name="phone_number" value={profileData.phone_number} onChange={handleInputChange} className="w-full p-2 border rounded" />
                </div>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                  Save Changes
                </button>
              </form>
            )}
            {activeForm === 'resetPassword' && (
              <form className={`w-1/2 mt-4 ${darkMode ? 'bg-dark-gray-200' : 'bg-light-darkcyan'} p-6 rounded-lg shadow`}>
                <div className="mb-4">
                  <label className="block mb-2">Old Password</label>
                  <input type="password" className="w-full p-2 border rounded" />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">New Password</label>
                  <input type="password" className="w-full p-2 border rounded" />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Confirm New Password</label>
                  <input type="password" className="w-full p-2 border rounded" />
                </div>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                  Reset Password
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentProfile;