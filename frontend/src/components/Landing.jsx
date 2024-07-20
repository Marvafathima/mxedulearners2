import React, { useState, useEffect,useContext} from 'react';

import { ThemeContext } from '../contexts/ThemeContext';
import Modal from './Modal';
import Register from './Register';
import OTPVerification from './OTPVerification';
import Login from './Login';
// const Navbar = ({ darkMode, toggleTheme }) => {
//   return (
//     <nav className={`${darkMode ? 'bg-dark-gray-300' : 'bg-light-blueberry'} p-4`}>
//       <div className="container mx-auto flex justify-between items-center">
//         <div className={`${darkMode ? 'text-dark-white' : 'text-white'} text-xl font-bold`}>MXEduLearners</div>
//         <div className="flex items-center space-x-4">
//           <NavItem darkMode={darkMode} href="/">Home</NavItem>
//           <NavItem darkMode={darkMode} href="/register">Sign Up</NavItem>
//           <NavItem darkMode={darkMode} href="/login">Login</NavItem>
//           <NavItem darkMode={darkMode} href="/admin">Admin</NavItem>
//           <button 
//             onClick={toggleTheme}
//             className={`${darkMode ? 'bg-dark-gray-200 text-dark-white hover:bg-dark-gray-100' : 'bg-light-apricot text-white hover:bg-light-citrus'} px-3 py-1 rounded transition-colors`}
//           >
//             Toggle Theme
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// };

const Navbar = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
    
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [isOTPVerificationOpen, setIsOTPVerificationOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [registeredEmail, setRegisteredEmail] = useState('');



    const handleRegisterSuccess = (email) => {
      setIsRegisterOpen(false);
      setRegisteredEmail(email);
      setIsOTPVerificationOpen(true);
    };
  
    const handleOTPVerificationSuccess = () => {
      setIsOTPVerificationOpen(false);
      setIsLoginOpen(true);
    };
  
    const handleLoginSuccess = () => {
      setIsLoginOpen(false);
      // Navigate to home page or update state as needed
    };
    return (
      <nav className={`${darkMode ? 'bg-dark-gray-300' : 'bg-light-blueberry'} p-4`}>
        <div className="container mx-auto flex justify-between items-center">
          <div className={`${darkMode ? 'text-dark-white' : 'text-white'} text-xl font-bold`}>MXEduLearners</div>
          <div className="flex items-center space-x-4">
            <NavItem darkMode={darkMode} href="/">Home</NavItem>
            <button onClick={() => setIsRegisterOpen(true)} className={`${darkMode ? 'text-dark-white hover:text-dark-gray-100' : 'text-white hover:text-light-applecore'}`}>Sign Up</button>
            <button onClick={() => setIsLoginOpen(true)} className={`${darkMode ? 'text-dark-white hover:text-dark-gray-100' : 'text-white hover:text-light-applecore'}`}>Login</button>
            <NavItem darkMode={darkMode} href="/admin/login">Admin</NavItem>
            <button 
              onClick={toggleTheme}
              className={`${darkMode ? 'bg-dark-gray-200 text-dark-white hover:bg-dark-gray-100' : 'bg-light-apricot text-white hover:bg-light-citrus'} px-3 py-1 rounded transition-colors`}
            >
              Toggle Theme
            </button>
          </div>
        </div>
        
        <Modal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)}>
        <Register onSuccess={handleRegisterSuccess} />
      </Modal>
      <Modal isOpen={isOTPVerificationOpen} onClose={() => setIsOTPVerificationOpen(false)}>
        <OTPVerification email={registeredEmail} onSuccess={handleOTPVerificationSuccess} />
      </Modal>
      <Modal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)}>
        <Login onSuccess={handleLoginSuccess} />
      </Modal>
      </nav>
    );
  };

  
  
  

const NavItem = ({ darkMode, href, children }) => (
  <a href={href} className={`${darkMode ? 'text-dark-white hover:text-dark-gray-100' : 'text-white hover:text-light-applecore'}`}>{children}</a>
);

const LandingPage = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  // const [darkMode, setDarkMode] = useState(true);

  // useEffect(() => {
  //   if (darkMode) {
  //     document.documentElement.classList.add('dark');
  //   } else {
  //     document.documentElement.classList.remove('dark');
  //   }
  // }, [darkMode]);

  // const toggleTheme = () => setDarkMode(!darkMode);


  return (
    <div className={`${darkMode ? 'bg-dark-gray-300' : 'bg-light-applecore'} min-h-screen`}>
      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />
      <main className="container mx-auto mt-10 p-4">
        <h1 className={`${darkMode ? 'text-dark-white' : 'text-light-blueberry'} text-4xl font-bold mb-4`}>
          Welcome to MXEduLearners
        </h1>
        <p className={`${darkMode ? 'text-dark-gray-100' : 'text-light-apricot'} mb-6`}>
          Empowering learners with innovative educational solutions.
        </p>
        <button className={`${darkMode ? 'bg-dark-gray-200 text-dark-white hover:bg-dark-gray-100' : 'bg-light-citrus text-white hover:bg-light-apricot'} px-6 py-2 rounded transition-colors`}>
          Get Started
        </button>
      </main>
    </div>
  );
};

export default LandingPage;



