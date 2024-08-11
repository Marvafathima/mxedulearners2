// import React from 'react';

// const CourseCard = ({ course }) => {
//   return (
//     <div className="bg-white shadow-md rounded-lg overflow-hidden">
//       <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
//       <div className="p-4">
//         <h3 className="font-bold text-lg mb-2">{course.title}</h3>
//         <p className="text-gray-600">{course.instructor}</p>
//         <div className="mt-2">
//           <span className="text-yellow-500">{course.rating}</span>
//           <span className="text-gray-500 ml-2">({course.reviews} reviews)</span>
//         </div>
//         <p className="mt-2 font-bold">${course.price}</p>
//       </div>
//     </div>
//   );
// };

// const CourseCards = () => {
//   const dummyCourses = [
//     // Add dummy course data here
//   ];

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-8">
//       {dummyCourses.map((course) => (
//         <CourseCard key={course.id} course={course} />
//       ))}
//     </div>
//   );
// };

// export default CourseCards;
import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { useMemo } from 'react';
const CourseCard = ({ course }) => {
  const discountedPrice = course.offer_percentage > 0
    ? course.price - (course.price * course.offer_percentage / 100)
    : course.price;
  //   const backendURL = import.meta.env.VITE_API_URL || '';
  //   const thumbnailPath = course.thumbnail.startsWith('=') ? course.thumbnail.slice(1) : course.thumbnail;
  // const thumbnailURL = `${backendURL}${thumbnailPath}`\

  const thumbnailURL = useMemo(() => {
    const backendURL = import.meta.env.VITE_API_URL || '';
    const thumbnailPath = course.thumbnail;
    
    return `${backendURL}${thumbnailPath}`;
  }, [course.thumbnail]);
  console.log(course.user.username,"this is the user")
  

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden relative group">
      <img   src={thumbnailURL} 
       alt={course.name} 
      className="w-full h-48 object-cover" 
      
      />
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{course.name}</h3>
        <p className="text-gray-600">{course.user.username}</p>
        <div className="mt-2">
          <span className="text-yellow-500">{course.rating}</span>
          <span className="text-gray-500 ml-2">({course.lessons.length} lessons)</span>
        </div>
        <div className="mt-2">
          {course.offer_percentage > 0 ? (
            <>
              <span className="font-bold text-lg">₹{discountedPrice.toFixed(2)}</span>
              <span className="text-gray-500 line-through ml-2">₹{course.price}</span>
            </>
          ) : (
            <span className="font-bold text-lg">₹{course.price}</span>
          )}
        </div>
        <p className="mt-2">Points: {course.points}</p>
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-75 text-white p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="font-bold text-lg mb-2">{course.name}</h3>
        <p className="mb-2">{course.description}</p>
        <p>Total lessons: {course.lessons.length}</p>
        <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded">Add to cart</button>
        <button className="mt-4 ml-2 text-white"><FaHeart /></button>
      </div>
    </div>
  );
};

export default CourseCard;