
// import React, { useContext, useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { ThemeContext } from '../../../contexts/ThemeContext';
// import { fetchStudentProfile, updateProfile, updateProfilePicture } from '../../../store/authSlice';
// import ProfileSidebar from './ProfileSidebar';
// import Navbar from './Navbar';
// import { FaRankingStar, FaBookOpen, FaTrophy, FaPlus, FaTrash } from 'react-icons/fa6';
// import { FaQuestionCircle } from 'react-icons/fa';
// import { getCurrentUserTokens, getFullImageUrl } from '../../../utils/auth';
// import { toast } from 'react-toastify';
// const StudentProfile = () => {
//   const { darkMode } = useContext(ThemeContext);
//   const dispatch = useDispatch();
//   const { user, loading, error } = useSelector((state) => state.auth);
//   const [activeForm, setActiveForm] = useState(null);
//   const [profileData, setProfileData] = useState({
//     username: '',
//     email: '',
//     phone_number: '',
//   });

//   useEffect(() => {
//     dispatch(fetchStudentProfile());
//   }, [dispatch]);

//   useEffect(() => {
//     if (user) {
//       setProfileData({
//         username: user.username,
//         email: user.email,
//         phone_number: user.phone_number,
//       });
//     }
//   }, [user]);

//   if (loading) return <div>Loading...</div>;
// //   if (error) return <div>Error: {error}</div>;

//   const statsData = [
//     { icon: <FaRankingStar />, label: 'Rank', value: '10' },
//     { icon: <FaBookOpen />, label: 'Courses Purchased', value: '5' },
//     { icon: <FaQuestionCircle />, label: 'Quiz Taken', value: '15' },
//     { icon: <FaTrophy />, label: 'Score', value: '85%' },
//   ];

//   const handleInputChange = (e) => {
//     setProfileData({ ...profileData, [e.target.name]: e.target.value });
//   };

//   const handleProfileUpdate = async (e) => {
//     e.preventDefault();
//     const result=await dispatch(updateProfile(profileData));
//     if (updateProfile.fulfilled.match(result)){
//       toast.success("Successfully updated your profile")  
//     }
   
    
   
//     // setActiveForm(null);
//   };

//   const handleProfilePictureChange = async (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const formData = new FormData();
//       formData.append('profile_pic', file);
//       await dispatch(updateProfilePicture(formData));
//     }
//   };

//   const handleRemoveProfilePicture = async () => {
//     const formData = new FormData();
//     formData.append('profile_pic', '');
//     await dispatch(updateProfilePicture(formData));
//   };

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
//                   src={getFullImageUrl(user.profile_pic) || 'https://via.placeholder.com/150'}
//                   alt={user.username}
//                   className="w-24 h-24 rounded-full mr-6"
//                 />
//                 <label htmlFor="profile-pic-input" className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1 cursor-pointer">
//                   <FaPlus className="text-white" />
//                 </label>
//                 <input
//                   id="profile-pic-input"
//                   type="file"
//                   accept="image/*"
//                   className="hidden"
//                   onChange={handleProfilePictureChange}
//                 />
//                 {user.profile_pic && (
//                   <button
//                     onClick={handleRemoveProfilePicture}
//                     className="absolute top-0 right-0 bg-red-500 rounded-full p-1"
//                   >
//                     <FaTrash className="text-white" />
//                   </button>
//                 )}
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
//           <div className="mt-8 flex space-x-4 justify-center">
//             <button
//               onClick={() => setActiveForm('editProfile')}
//               className={`py-2 px-4 rounded ${
//                 activeForm === 'editProfile'
//                   ? 'bg-blue-500 text-white'
//                   : `${darkMode ? 'bg-dark-gray-200 text-dark-white' : 'bg-light-cyan text-gray-800'}`
//               }`}
//             >
//               Edit Profile
//             </button>
//             <button
//               onClick={() => setActiveForm('resetPassword')}
//               className={`py-2 px-4 rounded ${
//                 activeForm === 'resetPassword'
//                   ? 'bg-blue-500 text-white'
//                   : `${darkMode ? 'bg-dark-gray-200 text-dark-white' : 'bg-light-cyan text-gray-800'}`
//               }`}
//             >
//               Reset Password
//             </button>
//           </div>
//           <div className="flex justify-center mt-4">
//             {activeForm === 'editProfile' && (
//               <form onSubmit={handleProfileUpdate} className={`w-1/2 mt-4 ${darkMode ? 'bg-dark-gray-200' : 'bg-light-darkcyan'} p-6 rounded-lg shadow`}>
//                 <div className="mb-4">
//                   <label className="block mb-2">Username</label>
//                   <input type="text" name="username" value={profileData.username} onChange={handleInputChange} className="w-full p-2 border rounded" />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block mb-2">Email</label>
//                   <input type="email" name="email" value={profileData.email} onChange={handleInputChange} className="w-full p-2 border rounded" />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block mb-2">Phone Number</label>
//                   <input type="tel" name="phone_number" value={profileData.phone_number} onChange={handleInputChange} className="w-full p-2 border rounded" />
//                 </div>
//                 <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
//                   Save Changes
//                 </button>
//               </form>
//             )}
//             {activeForm === 'resetPassword' && (
//               <form className={`w-1/2 mt-4 ${darkMode ? 'bg-dark-gray-200' : 'bg-light-darkcyan'} p-6 rounded-lg shadow`}>
//                 <div className="mb-4">
//                   <label className="block mb-2">Old Password</label>
//                   <input type="password" className="w-full p-2 border rounded" />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block mb-2">New Password</label>
//                   <input type="password" className="w-full p-2 border rounded" />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block mb-2">Confirm New Password</label>
//                   <input type="password" className="w-full p-2 border rounded" />
//                 </div>
//                 <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
//                   Reset Password
//                 </button>
//               </form>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default StudentProfile;
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { fetchStudentProfile,preupdateProfile,profileverifyOTP,profilesendVerificationOTP,updateProfilePicture,  } from '../../../store/authSlice';
import ProfileSidebar from './ProfileSidebar';
import Navbar from './Navbar';
import { FaRankingStar, FaBookOpen, FaTrophy, FaPlus, FaTrash } from 'react-icons/fa6';
import { FaQuestionCircle } from 'react-icons/fa';
import { getFullImageUrl } from '../../../utils/auth';
import { toast } from 'react-toastify';

const StudentProfile = () => {
  const { darkMode } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const { user, loading, error,otpSent, otpVerified } = useSelector((state) => state.auth);
  const [activeForm, setActiveForm] = useState(null);
  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
    phone_number: '',
  });
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [otp, setOTP] = useState('');
  const [newEmail,setNewEmail]=useState('');
  const [timer, setTimer] = useState(60);
  const [isResendActive, setIsResendActive] = useState(false);
  const statsData = [
        { icon: <FaRankingStar />, label: 'Rank', value: '10' },
        { icon: <FaBookOpen />, label: 'Courses Purchased', value: '5' },
        { icon: <FaQuestionCircle />, label: 'Quiz Taken', value: '15' },
        { icon: <FaTrophy />, label: 'Score', value: '85%' },
      ];
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

  useEffect(() => {
    let interval;
    if (showOTPModal && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsResendActive(true);
    }
    return () => clearInterval(interval);
  }, [showOTPModal, timer]);

  const handleInputChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  // const handleProfileUpdate = async (e) => {
  //   e.preventDefault();
  //   if (profileData.email !== user.email) {
  //     // If email has changed, send OTP
  //     const response = await dispatch(sendVerificationOTP(profileData.email));
  //     if (response.payload.success) {
  //       setShowOTPModal(true);
  //       setTimer(60);
  //       setIsResendActive(false);
  //     } else {
  //       toast.error(response.payload.error);
  //     }
  //   } else {
  //     // If email hasn't changed, update profile directly
  //     updateProfileData();
  //   }
  // };
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    if (profileData.email !== user.email) {
      setNewEmail(profileData.email);
      const response = await dispatch(profilesendVerificationOTP(profileData.email));
      if (response.payload && !response.error) {
        setShowOTPModal(true);
        setTimer(60);
        setIsResendActive(false);
      } else {
        toast.error(response.error || 'Failed to send OTP');
      }
    } else {
      updateProfileData();
    }
  };

  const handleVerifyOTP = async () => {
    const response = await dispatch(profileverifyOTP({ email: newEmail, otp }));
    if (response.payload && !response.error) {
      setShowOTPModal(false);
      setProfileData({ ...profileData, email: newEmail });
      updateProfileData();
    } else {
      toast.error('Invalid OTP. Please try again.');
      setIsResendActive(true);
    }
  };

  const updateProfileData = async () => {
    const response = await dispatch(preupdateProfile(profileData));
    if (response.payload && !response.error) {
      toast.success('Profile updated successfully');
      setActiveForm(null);
      updateLocalStorage();
    } else {
      if (response.error) {
        if (response.error.email) {
          toast.error(`Email error: ${response.error.email[0]}`);
        }
        if (response.error.phone_number) {
          toast.error(`Phone number error: ${response.error.phone_number[0]}`);
        }
      }
    }
  };

  // const updateProfileData = async () => {
  //   const response = await dispatch(updateProfile(profileData));
  //   if (response.payload.success) {
  //     toast.success('Profile updated successfully');
  //     setActiveForm(null);
  //     // Update local storage
  //     const currentUser = localStorage.getItem('current_user');
  //     if (currentUser !== profileData.email) {
  //       const accessToken = localStorage.getItem(`${currentUser}_access_token`);
  //       const refreshToken = localStorage.getItem(`${currentUser}_refresh_token`);
  //       const role = localStorage.getItem(`${currentUser}_role`);
        
  //       localStorage.removeItem(`${currentUser}_access_token`);
  //       localStorage.removeItem(`${currentUser}_refresh_token`);
  //       localStorage.removeItem(`${currentUser}_role`);
        
  //       localStorage.setItem(`${profileData.email}_access_token`, accessToken);
  //       localStorage.setItem(`${profileData.email}_refresh_token`, refreshToken);
  //       localStorage.setItem(`${profileData.email}_role`, role);
  //       localStorage.setItem('current_user', profileData.email);
  //     }
  //   } else {
  //     if (response.payload.email) {
  //       toast.error(`Email error: ${response.payload.email[0]}`);
  //     }
  //     if (response.payload.phone_number) {
  //       toast.error(`Phone number error: ${response.payload.phone_number[0]}`);
  //     }
  //   }
  // };

  // const handleVerifyOTP = async () => {
  //   const response = await dispatch(verifyOTP({ email: profileData.email, otp }));
  //   if (response.payload.success) {
  //     setShowOTPModal(false);
  //     updateProfileData();
  //   } else {
  //     toast.error('Invalid OTP. Please try again.');
  //     setIsResendActive(true);
  //   }
  // };

  const handleResendOTP = async () => {
    const response = await dispatch(sendVerificationOTP(profileData.email));
    if (response.payload.success) {
      setTimer(60);
      setIsResendActive(false);
      toast.success('OTP resent successfully');
    } else {
      toast.error(response.payload.error);
    }
  };

  // ... (rest of the component code remains the same)

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
                  // onChange={handleProfilePictureChange}
                />
                {user.profile_pic && (
                  <button
                    // onClick={handleRemoveProfilePicture}
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
              <form onSubmit={handleProfileUpdate} className={`w-1/2 mt-4 ${darkMode ? 'bg-dark-gray-200 text-black' : 'bg-light-darkcyan'} p-6 rounded-lg shadow`}>
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
      {showOTPModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className={`bg-${darkMode ? 'dark-gray-200' : 'white'} p-6 rounded-lg shadow-lg relative`}>
      <button 
        onClick={() => setShowOTPModal(false)} 
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        &times;
      </button>
      <h2 className="text-xl font-bold mb-4">Verify Your Email</h2>
      <p>An OTP has been sent to your new email. Please enter it below:</p>
      <input
        type="text"
        value={otp}
        onChange={(e) => setOTP(e.target.value)}
        className="w-full p-2 border rounded mt-2"
        placeholder="Enter OTP"
      />
      <button
        onClick={handleVerifyOTP}
        className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
        disabled={loading}
      >
        {loading ? 'Verifying...' : 'Verify OTP'}
      </button>
      <button
        onClick={handleResendOTP}
        className="bg-gray-300 text-gray-700 py-2 px-4 rounded mt-4 ml-2"
        disabled={loading}
      >
        {loading ? 'Sending...' : 'Resend OTP'}
      </button>
    </div>
  </div>
)}
      {/* {showOTPModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className={`bg-${darkMode ? 'dark-gray-200' : 'white'} p-6 rounded-lg shadow-lg`}>
            <h2 className="text-xl font-bold mb-4">Verify Your Email</h2>
            <p>An OTP has been sent to your new email. Please enter it below:</p>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
              className="w-full p-2 border rounded mt-2"
              placeholder="Enter OTP"
            />
            <p className="mt-2">Time remaining: {timer} seconds</p>
            {isResendActive ? (
              <button
                onClick={handleResendOTP}
                className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Resend OTP'}
              </button>
            ) : (
              <button
                onClick={handleVerifyOTP}
                className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
                disabled={loading}
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
            )}
          </div>
        </div>
      )} */}
    </>
  );
};

export default StudentProfile;