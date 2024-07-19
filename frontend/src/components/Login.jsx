import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
      <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
      <button type="submit" disabled={loading}>Login</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default Login;