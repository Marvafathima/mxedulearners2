
import React, { useContext } from 'react';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { Link } from 'react-router-dom';
import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

const categories = [
  'Full Stack Development',
  'Frontend',
  'Backend',
  'Data Science',
  'Machine Learning',
  'Cybersecurity',
  'Mobile App Development'
];

const Navbar = ({user}) => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <nav className={`${darkMode ? 'bg-dark-gray-200' : 'bg-light-blueberry'} p-4`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-xl font-bold">MXEduLearners</Link>
          
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className={`inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ${
                darkMode 
                  ? 'bg-dark-gray-100 text-dark-white ring-dark-gray-100 hover:bg-dark-gray-200' 
                  : 'bg-white text-gray-900 ring-gray-300 hover:bg-gray-50'
              }`}>
                Categories
                <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
              </Menu.Button>
            </div>

            <Menu.Items className={`absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
              darkMode 
                ? 'bg-dark-gray-200 text-dark-white' 
                : 'bg-white text-gray-700'
            }`}>
              <div className="py-1">
                {categories.map((category, index) => (
                  <Menu.Item key={index}>
                    {({ active }) => (
                      <Link
                        to={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                        className={`block px-4 py-2 text-sm ${
                          active
                            ? darkMode 
                              ? 'bg-dark-gray-100 text-dark-white' 
                              : 'bg-gray-100 text-gray-900'
                            : darkMode
                              ? 'text-dark-white'
                              : 'text-gray-700'
                        }`}
                      >
                        {category}
                      </Link>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Menu>

          <input type="search" placeholder="Search for anything" className={`p-2 rounded ${
            darkMode ? 'bg-dark-gray-100 text-dark-white' : 'bg-white text-gray-900'
          }`} />
        </div>
        
        {/* Rest of the navbar content */}
        <div className="flex items-center space-x-4">
          <Link to="/courses" className={darkMode ? 'text-dark-white' : 'text-white'}>Courses</Link>
          <Link to="/chats" className={darkMode ? 'text-dark-white' : 'text-white'}>Chats</Link>
          <Link to="/video-call" className={darkMode ? 'text-dark-white' : 'text-white'}>Video Call</Link>
          <Link to="/discussion" className={darkMode ? 'text-dark-white' : 'text-white'}>Discussion</Link>
          <Link to="/my-learning" className={darkMode ? 'text-dark-white' : 'text-white'}>My Learning</Link>
          {/* Add wishlist and cart icons */}
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
            {user.profile_pic ? (
              <img src={user.profile_pic} alt={user.username} className="w-full h-full rounded-full" />
            ) : (
              <span>{user.username[0].toUpperCase()}</span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
// import {useSelector } from 'react-redux';
// const categories = [
//   'Full Stack Development',
//   'Frontend',
//   'Backend',
//   'Data Science',
//   'Machine Learning',
//   'Cybersecurity',
//   'Mobile App Development'
// ];

// const Navbar = () => {
//   const { darkMode } = useContext(ThemeContext);
  
//   return (
//     <nav className={`${darkMode ? 'bg-dark-gray-200' : 'bg-light-blueberry'} p-4`}>
//       <div className="container mx-auto flex justify-between items-center">
//         <div className="flex items-center space-x-4">
//           <Link to="/" className="text-xl font-bold">MXEduLearners</Link>
//           <select>
//             <option className={`bg-transparent ${darkMode ? 'text-dark-lightblue' : 'text-dark-lightblue'}`}>Categories</option>
//             {categories.map((category, index) => (
//               <option key={index} value={category.toLowerCase().replace(/\s+/g, '-')}
//               className={`bg-transparent ${darkMode ? 'text-dark-white' : 'text-dark-gray-100'}`}
              
//               >
//                 {category}
//               </option>
//             ))}
//           </select>
//           <input type="search" placeholder="Search for anything" className="p-2 rounded" />
//         </div>
//         <div className="flex items-center space-x-4">
//           <Link to="/courses" className={darkMode ? 'text-dark-white' : 'text-white'}>Courses</Link>
//           <Link to="/chats" className={darkMode ? 'text-dark-white' : 'text-white'}>Chats</Link>
//           <Link to="/video-call" className={darkMode ? 'text-dark-white' : 'text-white'}>Video Call</Link>
//           <Link to="/discussion" className={darkMode ? 'text-dark-white' : 'text-white'}>Discussion</Link>
//           <Link to="/my-learning" className={darkMode ? 'text-dark-white' : 'text-white'}>My Learning</Link>
//           {/* Add wishlist and cart icons */}
//           {/* <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
//             {user.profile_pic ? (
//               <img src={user.profile_pic} alt={user.username} className="w-full h-full rounded-full" />
//             ) : (
//               <span>{user.username[0].toUpperCase()}</span>
//             )}
//           </div> */}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;