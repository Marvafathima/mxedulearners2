import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchAllCourses } from '../../../store/courseSlice';
import CourseCard from './CourseCard';

const CourseCards = () => {
  const dispatch = useDispatch();
  const { courses, status, error } = useSelector((state) => state.courses);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllCourses());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-8">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
};

export default CourseCards;