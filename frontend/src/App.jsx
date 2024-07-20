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
      <Router>
        <div className="App">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify-otp" element={<OTPVerification/>} />
            <Route path="/landing-page" element={ <ThemeProvider><LandingPage/> </ThemeProvider>} />
            {/* Add other routes as needed */}
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
