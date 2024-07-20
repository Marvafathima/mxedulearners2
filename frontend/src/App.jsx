import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { store } from './store/store';
import Register from './components/Register';
import Login from './components/Login';
import OTPVerification from './components/OTPVerification';
import LandingPage from './components/Landing';
import { ThemeProvider } from './contexts/ThemeContext';
function App() {
  return (
    <Provider store={store}>
       <ThemeProvider>
      <Router>
        <div className="App">
          <Routes>

            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify-otp" element={<OTPVerification/>} />
            <Route path="/landing-page" element={<LandingPage/>} />
            {/* Add other routes as needed */}
          </Routes>
        </div>
      </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
