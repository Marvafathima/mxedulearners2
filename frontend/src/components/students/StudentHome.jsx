import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { fetchStudentDetails } from '../../store/authSlice'; // You'll need to create this thunk
import { getCurrentUserTokens } from '../../utils/auth';
import CourseCards from './studentcomponent/CourseCards';
const StudentHome = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    const tokens = getCurrentUserTokens();
    if (tokens && tokens.role === 'student') {
      dispatch(fetchStudentDetails());
    }
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user data available</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.username}!</h1>
      <div className="mb-4">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone_number}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>
      {/* Add more student-specific content here */}
      <div>
        <h2 className="text-xl font-bold mb-2">Your Courses</h2>
        {/* Add a list of enrolled courses here */}
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2">Upcoming Classes</h2>
        {/* Add a list of upcoming classes here */}
      </div>
    </div>
  );
};

export default StudentHome;