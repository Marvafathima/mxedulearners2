import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { store } from './store/store';
import Register from './components/Register';
import Login from './components/Login';
import OTPVerification from './components/OTPVerification';
import LandingPage from './components/Landing';
import { ThemeProvider } from './contexts/ThemeContext';
import Home  from './components/Home';
import ProtectedAdminRoute from './components/routes/ProtectedAdminRoute';
import AdminDashboard from './components/admin/AdminDashboard';

import AdminLoginPage from './components/admin/AdminLoginPage';
import RequestTutorPage from './components/admin/tutors/RequestTutorPage';
function App() {
  return (
    <Provider store={store}>
       <ThemeProvider>
      <Router>
        <div className="App">
          <Routes>

            {/* <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify-otp" element={<OTPVerification/>} /> */}
            <Route path="/landing-page" element={<LandingPage/>} />
            <Route path="/home" element={<Home/>} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin/dashboard"  
            element={
                <ProtectedAdminRoute>
                  <AdminDashboard />
                </ProtectedAdminRoute>
              } 
            />
 <Route path="/admin/tutors/requests"  
            element={
                <ProtectedAdminRoute>
                  <RequestTutorPage/>
                </ProtectedAdminRoute>
              } 
            />
           
          </Routes>
        </div>
      </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
