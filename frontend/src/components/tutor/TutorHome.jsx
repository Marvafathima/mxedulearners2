

import React, { useEffect,useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTutorDetails } from '../../store/authSlice';

const TutorHome = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current === false) {
      if (user && user.role === 'tutor') {
        dispatch(fetchTutorDetails());
      }
      return () => {
        effectRan.current = true;
      };
    }
  }, [dispatch, user]);
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
        <p><strong>Status:</strong> {user.is_approved ? 'Approved' : user.is_rejected ? 'Rejected' : 'Pending'}</p>
      </div>
      {user.tutor_application && (
        <div>
          <h2 className="text-xl font-bold mb-2">Tutor Details</h2>
          <p><strong>Education:</strong> {user.tutor_application.education_qualification}</p>
          <p><strong>Experience:</strong> {user.tutor_application.job_experience}</p>
        </div>
      )}
    </div>
  );
};

export default TutorHome;