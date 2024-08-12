
// import React, { useContext, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { ThemeContext } from '../../../contexts/ThemeContext';
// import { 
//   UserCircleIcon, AcademicCapIcon, ChatBubbleLeftRightIcon, 
//   VideoCameraIcon, UserGroupIcon, AcademicCapIcon as QuizIcon,
//   ShoppingCartIcon, HeartIcon, ChevronDownIcon
// } from '@heroicons/react/24/outline';

// const SidebarItem = ({ icon, label, children }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const { darkMode } = useContext(ThemeContext);

//   return (
//     <div className="mb-2">
//       <div 
//         className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${
//           darkMode ? 'hover:bg-dark-gray-100' : 'hover:bg-light-blueberry-200'
//         }`}
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         <div className="flex items-center">
//           {icon}
//           <span className="ml-2">{label}</span>
//         </div>
//         {children && (
//           <ChevronDownIcon 
//             className={`w-4 h-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} 
//           />
//         )}
//       </div>
//       {isOpen && children && (
//         <div className="ml-6 mt-1">
//           {children}
//         </div>
//       )}
//     </div>
//   );
// };

// const ProfileSidebar = () => {
//   const { darkMode, toggleTheme } = useContext(ThemeContext);

//   return (
//     <div className={`w-64 h-screen ${darkMode ? 'bg-dark-gray-200' : 'bg-dark-lightblue'} p-6`}>
//       <h2 className="text-xl font-semibold mb-6">Profile Settings</h2>
//       <ul className="space-y-2">
//         <SidebarItem icon={<UserCircleIcon className="w-5 h-5" />} label="Profile">
//           <Link to="/student/profile" className="block py-1 hover:underline">View Profile</Link>
//           <Link to="/student/profile/edit" className="block py-1 hover:underline">Edit Profile</Link>
//         </SidebarItem>

//         <SidebarItem icon={<AcademicCapIcon className="w-5 h-5" />} label="My Courses">
//           <Link to="/student/courses" className="block py-1 hover:underline">View Courses</Link>
//           <Link to="/student/progress" className="block py-1 hover:underline">View Progress</Link>
//         </SidebarItem>

//         <SidebarItem icon={<ChatBubbleLeftRightIcon className="w-5 h-5" />} label="Chats">
//           <Link to="/student/chats/requests" className="block py-1 hover:underline">Chat Requests</Link>
//           <Link to="/student/chats" className="block py-1 hover:underline">View Chats</Link>
//           <Link to="/student/chats/pending" className="block py-1 hover:underline">Pending Requests</Link>
//         </SidebarItem>

//         <SidebarItem icon={<VideoCameraIcon className="w-5 h-5" />} label="Video Call">
//           <Link to="/student/video-calls/scheduled" className="block py-1 hover:underline">Scheduled Calls</Link>
//           <Link to="/student/video-calls/requests" className="block py-1 hover:underline">Sent Requests</Link>
//         </SidebarItem>

//         <SidebarItem icon={<UserGroupIcon className="w-5 h-5" />} label="My Tutors">
//           <Link to="/student/tutors" className="block py-1 hover:underline">View Tutors</Link>
//         </SidebarItem>

//         <SidebarItem icon={<QuizIcon className="w-5 h-5" />} label="Quiz">
//           <Link to="/student/quiz/attended" className="block py-1 hover:underline">Attended Quiz</Link>
//           <Link to="/student/quiz/pending" className="block py-1 hover:underline">Pending Quiz</Link>
//         </SidebarItem>

//         <SidebarItem icon={<ShoppingCartIcon className="w-5 h-5" />} label="Cart">
//           <Link to="/student/cart" className="block py-1 hover:underline">View Cart</Link>
//         </SidebarItem>

//         <SidebarItem icon={<HeartIcon className="w-5 h-5" />} label="Wishlist">
//           <Link to="/student/wishlist" className="block py-1 hover:underline">View Wishlist</Link>
//         </SidebarItem>
//       </ul>
//       <div className="mt-8">
//         <button
//           onClick={toggleTheme}
//           className={`px-4 py-2 rounded ${
//             darkMode ? 'bg-dark-gray-100 text-dark-white' : 'bg-light-blueberry text-white'
//           }`}
//         >
//           {darkMode ? 'Light Mode' : 'Dark Mode'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProfileSidebar;
// import React, { useContext, useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { ThemeContext } from '../../../contexts/ThemeContext';
// import {
//   HomeIcon, UserCircleIcon, PencilIcon, UserGroupIcon, 
//   AcademicCapIcon, BeakerIcon, ChatBubbleLeftRightIcon, 
//   ShoppingCartIcon, HeartIcon
// } from '@heroicons/react/24/outline';

// const SidebarButton = ({ icon, label, to }) => {
//   const location = useLocation();
//   const isActive = location.pathname === to;

//   return (
//     <Link to={to} className={`flex items-center w-full p-3 mb-2 rounded-lg transition-colors duration-200 ${
//       isActive 
//         ? 'bg-white text-purple-700' 
//         : 'text-white hover:bg-purple-700'
//     }`}>
//       {icon}
//       <span className="ml-3">{label}</span>
//     </Link>
//   );
// };

// const ProfileSidebar = () => {
//   const { darkMode } = useContext(ThemeContext);

//   return (
//     <div className={`w-64 h-screen bg-purple-600 p-4`}>
//       <SidebarButton icon={<HomeIcon className="w-6 h-6" />} label="Dashboard" to="/dashboard" />
//       <SidebarButton icon={<UserCircleIcon className="w-6 h-6" />} label="My Profile" to="/profile" />
//       <SidebarButton icon={<PencilIcon className="w-6 h-6" />} label="Edit Profile" to="/edit-profile" />
//       <SidebarButton icon={<UserGroupIcon className="w-6 h-6" />} label="My Tutors" to="/my-tutors" />
//       <SidebarButton icon={<AcademicCapIcon className="w-6 h-6" />} label="My Courses" to="/my-courses" />
//       <SidebarButton icon={<BeakerIcon className="w-6 h-6" />} label="Quiz" to="/quiz" />
//       <SidebarButton icon={<ChatBubbleLeftRightIcon className="w-6 h-6" />} label="Chat" to="/chat" />
//       <SidebarButton icon={<ShoppingCartIcon className="w-6 h-6" />} label="Cart" to="/cart" />
//       <SidebarButton icon={<HeartIcon className="w-6 h-6" />} label="Wishlist" to="/wishlist" />
//     </div>
//   );
// };

// export default ProfileSidebar;
import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeContext } from '../../../contexts/ThemeContext';
import {
  HomeIcon, UserCircleIcon, PencilIcon, UserGroupIcon, 
  AcademicCapIcon, BeakerIcon, ChatBubbleLeftRightIcon, 
  ShoppingCartIcon, HeartIcon, ChevronDownIcon
} from '@heroicons/react/24/outline';

const SidebarButton = ({ icon, label, to, children }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const isActive = location.pathname.startsWith(to);
  const { darkMode } = useContext(ThemeContext);

  const baseClasses = "flex items-center w-full p-3 mb-2 rounded-lg transition-colors duration-200";
  const activeClasses = darkMode 
    ? "bg-dark-white text-dark-gray-300" 
    : "bg-light-applecore text-light-blueberry";
  const inactiveClasses = darkMode
    ? "text-dark-white hover:bg-dark-gray-200"
    : "text-light-applecore hover:bg-light-apricot";

  return (
    <div>
      <button 
        onClick={() => children && setIsOpen(!isOpen)} 
        className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
      >
        {icon}
        <span className="ml-3 flex-grow text-left">{label}</span>
        {children && <ChevronDownIcon className={`w-4 h-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />}
      </button>
      {isOpen && children && (
        <div className="ml-6 mt-1">
          {children}
        </div>
      )}
    </div>
  );
};

const SubMenuItem = ({ label, to }) => {
  const { darkMode } = useContext(ThemeContext);
  const textColor = darkMode ? "text-dark-lightblue" : "text-light-applecore";
  return (
    <Link to={to} className={`block py-2 px-4 ${textColor} hover:underline`}>
      {label}
    </Link>
  );
};

const ProfileSidebar = () => {
  const { darkMode } = useContext(ThemeContext);
  const bgColor = darkMode ? "bg-dark-gray-100" : "bg-light-blueberry";

  return (
    <div className={`w-64 h-screen ${bgColor} p-4`}>
      <SidebarButton icon={<HomeIcon className="w-6 h-6" />} label="Dashboard" to="/dashboard" />
      <SidebarButton icon={<UserCircleIcon className="w-6 h-6" />} label="My Profile" to="/profile">
        <SubMenuItem label="View Profile" to="/profile/view" />
        <SubMenuItem label="Edit Profile" to="/profile/edit" />
      </SidebarButton>
      <SidebarButton icon={<AcademicCapIcon className="w-6 h-6" />} label="My Courses" to="/courses">
        <SubMenuItem label="View Courses" to="/courses/view" />
        <SubMenuItem label="View Progress" to="/courses/progress" />
      </SidebarButton>
      <SidebarButton icon={<ChatBubbleLeftRightIcon className="w-6 h-6" />} label="Chat" to="/chat">
        <SubMenuItem label="Chat Requests" to="/chat/requests" />
        <SubMenuItem label="View Chats" to="/chat/view" />
        <SubMenuItem label="Pending Requests" to="/chat/pending" />
      </SidebarButton>
      <SidebarButton icon={<UserGroupIcon className="w-6 h-6" />} label="My Tutors" to="/tutors" />
      <SidebarButton icon={<BeakerIcon className="w-6 h-6" />} label="Quiz" to="/quiz">
        <SubMenuItem label="Attended Quiz" to="/quiz/attended" />
        <SubMenuItem label="Pending Quiz" to="/quiz/pending" />
      </SidebarButton>
      <SidebarButton icon={<ShoppingCartIcon className="w-6 h-6" />} label="Cart" to="/cart" />
      <SidebarButton icon={<HeartIcon className="w-6 h-6" />} label="Wishlist" to="/wishlist" />
    </div>
  );
};

export default ProfileSidebar;