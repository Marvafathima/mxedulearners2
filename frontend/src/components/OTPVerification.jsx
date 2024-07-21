
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyOTP } from '../store/authSlice';

const OTPVerification = ({ email,onSuccess }) => {
  const dispatch = useDispatch();
  const { loading, error,role } = useSelector((state) => state.auth);
  
  const [otp, setOtp] = useState('');
 

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(verifyOTP({ email, otp })).then((result) => {
  //     if (result.payload) {
  //       onSuccess();
  //     }
  //   });
  // };


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(verifyOTP({ email, otp })).then((result) => {
      if (!result.error) {
        onSuccess(result.payload.user.role);
      }
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
   
  );
};

export default OTPVerification;