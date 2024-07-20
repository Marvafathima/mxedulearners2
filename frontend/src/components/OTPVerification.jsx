// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { verifyOTP } from '../store/authSlice';
// import { useNavigate } from 'react-router-dom';
// const OTPVerification = () => {
//   const dispatch = useDispatch();
//   const navigate=useNavigate()
//   const { loading, error } = useSelector((state) => state.auth);
//   const [formData, setFormData] = useState({
//     email: '',
//     otp: '',
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     dispatch(verifyOTP(formData));
//      navigate("/login")
//   };

//    const renderError = (error) => {
//     if (typeof error === 'string') return error;
//     if (error.non_field_errors) return error.non_field_errors.join(', ');
//     return JSON.stringify(error);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
//       <input type="text" name="otp" value={formData.otp} onChange={handleChange} placeholder="OTP" required />
//       <button type="submit" disabled={loading}>Verify OTP</button>
//       {error && <p>{error}</p>}
//     </form>
//   );
// };

// export default OTPVerification;
// src/components/OTPVerification.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyOTP } from '../store/authSlice';

const OTPVerification = ({ email,onSuccess }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  // const [formData, setFormData] = useState({
  //   email: '',
  //   otp: '',
  // });
  const [otp, setOtp] = useState('');
  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(verifyOTP({email,otp})).then(() => {
      onSuccess();
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
    <p>Enter the OTP sent to {email}</p>
    <input
      type="text"
      value={otp}
      onChange={(e) => setOtp(e.target.value)}
      placeholder="OTP"
      className="w-full p-2 border rounded"
      required
    />
    <button
      type="submit"
      disabled={loading}
      className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
    >
      Verify OTP
    </button>
    {error && <p className="text-red-500">{error}</p>}
  </form>
    // <form onSubmit={handleSubmit} className="space-y-4">
    //   <input 
    //     type="email" 
    //     name="email" 
    //     value={formData.email} 
    //     onChange={handleChange} 
    //     placeholder="Email" 
    //     className="w-full p-2 border rounded"
    //     required 
    //   />
    //   <input 
    //     type="text" 
    //     name="otp" 
    //     value={formData.otp} 
    //     onChange={handleChange} 
    //     placeholder="OTP" 
    //     className="w-full p-2 border rounded"
    //     required 
    //   />
    //   <button 
    //     type="submit" 
    //     disabled={loading}
    //     className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
    //   >
    //     Verify OTP
    //   </button>
    //   {error && <p className="text-red-500">{error}</p>}
    // </form>
  );
};

export default OTPVerification;