import React from 'react';

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{course.title}</h3>
        <p className="text-gray-600">{course.instructor}</p>
        <div className="mt-2">
          <span className="text-yellow-500">{course.rating}</span>
          <span className="text-gray-500 ml-2">({course.reviews} reviews)</span>
        </div>
        <p className="mt-2 font-bold">${course.price}</p>
      </div>
    </div>
  );
};

const CourseCards = () => {
  const dummyCourses = [
    // Add dummy course data here
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-8">
      {dummyCourses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
};

export default CourseCards;