// src/components/admin/AdminTutors.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { authUserManagementInstance } from '../../../api/axios';
import { userManagementInstance } from '../../../api/axios';
const AdminTutors = () => {
  // const { type } = useParams();
  // const navigate = useNavigate();
  // const [tutors, setTutors] = useState([]);

  // useEffect(() => {
  //   fetchTutors();
  // }, [type]);

  // const fetchTutors = async () => {
  //   try {
   
  //     const response = await userManagementInstance.get('/admin/tutors');

  //     setTutors(response.data);
  //   } catch (error) {
  //     console.error('Error fetching tutors:', error);
  //   }
  // };

  // const handleAction = async (tutorId, action) => {
  //   try {
  //     await userManagementInstance.post(`/admin/tutors/${tutorId}/${action}`);
  //     fetchTutors();
  //   } catch (error) {
  //     console.error(`Error ${action} tutor:`, error);
  //   }
  // };

  const { type } = useParams();
  const navigate = useNavigate();
  const [tutors, setTutors] = useState([]);

  useEffect(() => {
    fetchTutors();
  }, [type]);

  const fetchTutors = async () => {
    try {
      const response = await userManagementInstance.get('/admin/tutors');
      setTutors(response.data);
    } catch (error) {
      console.error('Error fetching tutors:', error);
      if (error.response && error.response.status === 401) {
        // Redirect to login if unauthorized
        navigate('/admin/login');
      }
    }
  };

  const handleAction = async (tutorId, action) => {
    try {
      await userManagementInstance.post(`/admin/tutors/${tutorId}/${action}/`);
      fetchTutors();
    } catch (error) {
      console.error(`Error ${action} tutor:`, error);
      if (error.response && error.response.status === 401) {
        // Redirect to login if unauthorized
        navigate('/admin/login');
      }
    }
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">
        {type === 'requests' ? 'Tutor Requests' : 'Verified Tutors'}
      </h2>
      <div className="grid gap-4">
        {tutors.map((tutor) => (
          <div key={tutor.id} className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{tutor.email}</h3>
                <p className="text-sm text-gray-600">{tutor.name.toLowerCase()}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => navigate(`/admin/tutors/${tutor.id}`)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  View
                </button>
                {type === 'requests' && (
                  <>
                    <button
                      onClick={() => handleAction(tutor.id, 'approve')}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleAction(tutor.id, 'reject')}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTutors;