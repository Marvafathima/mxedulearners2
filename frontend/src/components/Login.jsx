
// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { loginUser } from '../store/authSlice';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { loading, error } = useSelector((state) => state.auth);
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const result = await dispatch(loginUser(formData)).unwrap();
//       const { user, access, refresh } = result;
     
//       const rolePrefix = user.role === 'tutor' ? 'tutor_' : 'student_';
//         localStorage.setItem(`${user.email}_access_token`, access);
//         localStorage.setItem(`${user.email}_refresh_token`,refresh);
//         localStorage.setItem(`${user.email}_role`, user.role);
//         localStorage.setItem('current_user', user.email);

//       if (user.role === 'tutor') {
//         console.log("it is a tutor")
//         navigate('/tutor-home');
//       } else if (user.role === 'student') {
//         navigate('/student-home');
//       }
//     } catch (err) {
//       console.error("Login failed:", err);
//       navigate('/landing-page');
//     }
//   };
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, setUser } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(loginUser(formData)).unwrap();
      dispatch(setUser(result.user));
      if (result.user.role === 'tutor') {
      
        navigate('/tutor-home');
      } else if (result.user.role === 'student') {
        navigate('/student-home');
      }
    } catch (err) {
      console.error("Login failed:", err);
      navigate('/landing-page');
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        className="w-full p-2 border rounded"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default Login;