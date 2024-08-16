// import React, { useState, useEffect, useContext } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { ThemeContext } from '../../contexts/ThemeContext';
// import { fetchTutorCourses } from '../../store/courseSlice';
// import { Link } from 'react-router-dom';
// import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';

// const CourseList = () => {
//   const { darkMode } = useContext(ThemeContext);
//   const dispatch = useDispatch();
//   const { courses, status, error } = useSelector(state => state.courses);
//   const user = useSelector(state => state.auth.user);

//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const coursesPerPage = 5;

//   useEffect(() => {
//     dispatch(fetchTutorCourses());
//   }, [dispatch]);

//   const handleDelete = (courseId) => {
//     // Implement delete functionality
//     console.log('Delete course:', courseId);
//   };

//   const filteredCourses = courses.filter(course =>
//     course.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const indexOfLastCourse = currentPage * coursesPerPage;
//   const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
//   const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   if (status === 'loading') {
//     return <div>Loading...</div>;
//   }

//   if (status === 'failed') {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className={`p-6 ${darkMode ? 'bg-dark-gray-300 text-dark-white' : 'bg-light-ash text-light-blueberry'}`}>
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-bold">My Courses</h2>
//         <Link to="/add-course" className="bg-light-citrus text-white px-4 py-2 rounded">
//           Add New Course
//         </Link>
//       </div>

//       <input
//         type="text"
//         placeholder="Search courses..."
//         className={`w-full p-2 mb-4 rounded ${darkMode ? 'bg-dark-gray-200' : 'bg-white'}`}
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />

//       <div className="overflow-x-auto">
//         <table className="w-full">
//           <thead>
//             <tr className={`${darkMode ? 'bg-dark-gray-200' : 'bg-light-gray-100'}`}>
//               <th className="p-2">Thumbnail</th>
//               <th className="p-2">Course Name</th>
//               <th className="p-2">Total Purchases</th>
//               <th className="p-2">Rating</th>
//               <th className="p-2">Price</th>
//               <th className="p-2">Offer Price</th>
//               <th className="p-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentCourses.map(course => (
//               <tr key={course.id} className={`${darkMode ? 'bg-dark-gray-100' : 'bg-white'}`}>
//                 <td className="p-2">
//                   <img src={course.thumbnail} alt={course.name} className="w-16 h-16 object-cover rounded" />
//                 </td>
//                 <td className="p-2">{course.name}</td>
//                 <td className="p-2">{course.total_purchases}</td>
//                 <td className="p-2">{course.rating}</td>
//                 <td className="p-2">${course.price.toFixed(2)}</td>
//                 <td className="p-2">${(course.price * (1 - course.offer_percentage / 100)).toFixed(2)}</td>
//                 <td className="p-2 space-x-2">
//                   <Link to={`/edit-course/${course.id}`} className="text-blue-500"><FaEdit /></Link>
//                   <button onClick={() => handleDelete(course.id)} className="text-red-500"><FaTrash /></button>
//                   <Link to={`/view-course/${course.id}`} className="text-green-500"><FaEye /></Link>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="mt-4 flex justify-center">
//         {Array.from({ length: Math.ceil(filteredCourses.length / coursesPerPage) }, (_, i) => (
//           <button
//             key={i}
//             onClick={() => paginate(i + 1)}
//             className={`mx-1 px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-light-citrus text-white' : 'bg-gray-200'}`}
//           >
//             {i + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CourseList;
import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ThemeContext } from '../../contexts/ThemeContext';
import { fetchTutorCourses } from '../../store/courseSlice';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';

import TutorSidebar from './TutorSidebar';
const CourseList = () => {
  const { darkMode } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const { courses, status, error } = useSelector(state => state.courses);
 
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 5;
  const user = useSelector(state => state.auth.user); 
  useEffect(() => {
    dispatch(fetchTutorCourses());
  }, [dispatch]);

  const handleDelete = (courseId) => {
    // Implement delete functionality
    console.log('Delete course:', courseId);
  };

  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex">
      <div className="fixed h-screen">
        <TutorSidebar user={user} />
      </div>
      <div className="flex-grow ml-64 p-6">
        <div className={`${darkMode ? 'bg-dark-gray-300 text-dark-white' : 'bg-light-ash text-light-blueberry'}`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">My Courses</h2>
            <Link to="/add-course" className="bg-light-citrus text-white px-4 py-2 rounded hover:bg-light-citrus-dark transition duration-300">
              Add New Course
            </Link>
          </div>

          <div className="flex justify-center mb-4">
            <input
              type="text"
              placeholder="Search courses..."
              className={`w-1/2 p-2 rounded ${darkMode ? 'bg-dark-gray-200' : 'bg-white'}`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full max-w-4xl mx-auto">
              <thead>
                <tr className={`${darkMode ? 'bg-dark-gray-200' : 'bg-light-gray-100'}`}>
                  <th className="p-3 text-left">Thumbnail</th>
                  <th className="p-3 text-left">Course Name</th>
                  <th className="p-3 text-left">Total Purchases</th>
                  <th className="p-3 text-left">Rating</th>
                  <th className="p-3 text-left">Price</th>
                  <th className="p-3 text-left">Offer Price</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentCourses.map((course, index) => (
                  <tr 
                    key={course.id} 
                    className={`
                      ${darkMode ? 'bg-dark-gray-100 hover:bg-dark-gray-200' : 'bg-white hover:bg-light-gray-100'}
                      ${index % 2 === 0 ? 'bg-opacity-50' : ''}
                      transition duration-300
                    `}
                  >
                    <td className="p-3">
                      <img src={course.thumbnail} alt={course.name} className="w-24 h-24 object-cover rounded" />
                    </td>
                    <td className="p-3">{course.name}</td>
                    <td className="p-3">{course.total_purchases}</td>
                    <td className="p-3">{course.rating}</td>
                    <td className="p-3">${course.price.toFixed(2)}</td>
                    <td className="p-3">${(course.price * (1 - course.offer_percentage / 100)).toFixed(2)}</td>
                    <td className="p-3">
                      <div className="flex space-x-2">
                        <Link to={`/edit-course/${course.id}`} className="text-blue-500 hover:text-blue-700 transition duration-300">
                          <FaEdit size={20} />
                        </Link>
                        <button onClick={() => handleDelete(course.id)} className="text-red-500 hover:text-red-700 transition duration-300">
                          <FaTrash size={20} />
                        </button>
                        <Link to={`/view-course/${course.id}`} className="text-green-500 hover:text-green-700 transition duration-300">
                          <FaEye size={20} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex justify-center">
            {Array.from({ length: Math.ceil(filteredCourses.length / coursesPerPage) }, (_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={`mx-1 px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-light-citrus text-white' : 'bg-dark-gray-200 hover:bg-dark-gray-300'} transition duration-300`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
    // <>
    // <div className="fixed h-screen">
    //   <TutorSidebar user={user} />
    // </div>
   
  

    // <div className={`p-6 ${darkMode ? 'bg-dark-gray-300 text-dark-white' : 'bg-light-ash text-light-blueberry'}`}>
    //   <div className="flex justify-between items-center mb-4">
    //     <h2 className="text-2xl font-bold">My Courses</h2>
    //     <Link to="/add-course" className="bg-light-citrus text-white px-4 py-2 rounded hover:bg-light-citrus-dark transition duration-300">
    //       Add New Course
    //     </Link>
    //   </div>

    //   <input
    //     type="text"
    //     placeholder="Search courses..."
    //     className={`w-full max-w-2xl mx-auto p-2 mb-4 rounded ${darkMode ? 'bg-dark-gray-200' : 'bg-white'}`}
    //     value={searchTerm}
    //     onChange={(e) => setSearchTerm(e.target.value)}
    //   />

    //   <div className="overflow-x-auto">
    //     <table className="w-full max-w-4xl mx-auto">
    //       <thead>
    //         <tr className={`${darkMode ? 'bg-dark-gray-200' : 'bg-light-gray-100'}`}>
    //           <th className="p-3 text-left">Thumbnail</th>
    //           <th className="p-3 text-left">Course Name</th>
    //           <th className="p-3 text-left">Total Purchases</th>
    //           <th className="p-3 text-left">Rating</th>
    //           <th className="p-3 text-left">Price</th>
    //           <th className="p-3 text-left">Offer Price</th>
    //           <th className="p-3 text-left">Actions</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {currentCourses.map((course, index) => (
    //           <tr 
    //             key={course.id} 
    //             className={`
    //               ${darkMode ? 'bg-dark-gray-100 hover:bg-dark-gray-200' : 'bg-white hover:bg-light-gray-100'}
    //               ${index % 2 === 0 ? 'bg-opacity-50' : ''}
    //               transition duration-300
    //             `}
    //           >
    //             <td className="p-3">
    //               <img src={course.thumbnail} alt={course.name} className="w-24 h-24 object-cover rounded" />
    //             </td>
    //             <td className="p-3">{course.name}</td>
    //             <td className="p-3">{course.total_purchases}</td>
    //             <td className="p-3">{course.rating}</td>
    //             <td className="p-3">${course.price.toFixed(2)}</td>
    //             <td className="p-3">${(course.price * (1 - course.offer_percentage / 100)).toFixed(2)}</td>
    //             <td className="p-3">
    //               <div className="flex space-x-2">
    //                 <Link to={`/edit-course/${course.id}`} className="text-blue-500 hover:text-blue-700 transition duration-300">
    //                   <FaEdit size={20} />
    //                 </Link>
    //                 <button onClick={() => handleDelete(course.id)} className="text-red-500 hover:text-red-700 transition duration-300">
    //                   <FaTrash size={20} />
    //                 </button>
    //                 <Link to={`/view-course/${course.id}`} className="text-green-500 hover:text-green-700 transition duration-300">
    //                   <FaEye size={20} />
    //                 </Link>
    //               </div>
    //             </td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   </div>

    //   <div className="mt-4 flex justify-center">
    //     {Array.from({ length: Math.ceil(filteredCourses.length / coursesPerPage) }, (_, i) => (
    //       <button
    //         key={i}
    //         onClick={() => paginate(i + 1)}
    //         className={`mx-1 px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-light-citrus text-white' : 'bg-dark-gray-200 hover:bg-dark-gray-300'} transition duration-300`}
    //       >
    //         {i + 1}
    //       </button>
    //     ))}
    //   </div>
    // </div>  </>
  );
};

export default CourseList;