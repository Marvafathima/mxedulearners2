// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { registerUser } from '../store/authSlice';
// import { useNavigate } from 'react-router-dom';
// const Register = () => {
//   const dispatch = useDispatch();
//   const navigate=useNavigate()
//   const { loading, error } = useSelector((state) => state.auth);
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     phone_number: '',
//     password: '',
//     confirm_password: '',
//     role: 'student',
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
  
//     dispatch(registerUser(formData));
//     navigate("/verify-otp")
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
//       <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
//       <input type="tel" name="phone_number" value={formData.phone_number} onChange={handleChange} placeholder="Phone Number" required />
//       <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
//       <input type="password" name="confirm_password" value={formData.confirm_password} onChange={handleChange} placeholder="Confirm Password" required />
//       <select name="role" value={formData.role} onChange={handleChange}>
//         <option value="student">Student</option>
//         <option value="tutor">Tutor</option>
//         <option value="admin">Admin</option>
//       </select>
//       <button type="submit" disabled={loading}>Register</button>
//       {error && <p>{error}</p>}
//     </form>
//   );
// };

// export default Register;

// src/components/Register.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../store/authSlice';

const Register = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone_number: '',
    password: '',
    confirm_password: '',
    role: 'student',
  });
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.username) errors.username = 'Username is required';
    if (!formData.email) errors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
    if (!formData.phone_number) errors.phone_number = 'Phone number is required';
    if (!formData.password) errors.password = 'Password is required';
    if (formData.password !== formData.confirm_password) errors.confirm_password = 'Passwords do not match';
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      dispatch(registerUser(formData)).then(() => {
        onSuccess(formData.email);
      });
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input 
        type="text" 
        name="username" 
        value={formData.username} 
        onChange={handleChange} 
        placeholder="Username" 
        className="w-full p-2 border rounded"
      />
      {formErrors.username && <p className="text-red-500">{formErrors.username}</p>}
      
      <input 
        type="email" 
        name="email" 
        value={formData.email} 
        onChange={handleChange} 
        placeholder="Email" 
        className="w-full p-2 border rounded"
      />
      {formErrors.email && <p className="text-red-500">{formErrors.email}</p>}
      
      <input 
        type="tel" 
        name="phone_number" 
        value={formData.phone_number} 
        onChange={handleChange} 
        placeholder="Phone Number" 
        className="w-full p-2 border rounded"
      />
      {formErrors.phone_number && <p className="text-red-500">{formErrors.phone_number}</p>}
      
      <input 
        type="password" 
        name="password" 
        value={formData.password} 
        onChange={handleChange} 
        placeholder="Password" 
        className="w-full p-2 border rounded"
      />
      {formErrors.password && <p className="text-red-500">{formErrors.password}</p>}
      
      <input 
        type="password" 
        name="confirm_password" 
        value={formData.confirm_password} 
        onChange={handleChange} 
        placeholder="Confirm Password" 
        className="w-full p-2 border rounded"
      />
      {formErrors.confirm_password && <p className="text-red-500">{formErrors.confirm_password}</p>}
      
      <select 
        name="role" 
        value={formData.role} 
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option value="student">Student</option>
        <option value="tutor">Tutor</option>
        <option value="admin">Admin</option>
      </select>
      
      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Register
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default Register;