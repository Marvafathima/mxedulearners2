import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyOTP } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
const OTPVerification = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const { loading, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    dispatch(verifyOTP(formData));
    // navigate("/login")
  };
   // Helper function to render errors
   const renderError = (error) => {
    if (typeof error === 'string') return error;
    if (error.non_field_errors) return error.non_field_errors.join(', ');
    return JSON.stringify(error);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
      <input type="text" name="otp" value={formData.otp} onChange={handleChange} placeholder="OTP" required />
      <button type="submit" disabled={loading}>Verify OTP</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default OTPVerification;