import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
const Register = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const { loading, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone_number: '',
    password: '',
    confirm_password: '',
    role: 'student',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    dispatch(registerUser(formData));
    navigate("/verify-otp")
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
      <input type="tel" name="phone_number" value={formData.phone_number} onChange={handleChange} placeholder="Phone Number" required />
      <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
      <input type="password" name="confirm_password" value={formData.confirm_password} onChange={handleChange} placeholder="Confirm Password" required />
      <select name="role" value={formData.role} onChange={handleChange}>
        <option value="student">Student</option>
        <option value="tutor">Tutor</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit" disabled={loading}>Register</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default Register;