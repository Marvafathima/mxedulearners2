import React, { useState, useEffect } from 'react';

const Navbar = ({ darkMode, toggleTheme }) => {
  return (
    <nav className={`${darkMode ? 'bg-dark-gray-300' : 'bg-light-blueberry'} p-4`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className={`${darkMode ? 'text-dark-white' : 'text-white'} text-xl font-bold`}>MXEduLearners</div>
        <div className="flex items-center space-x-4">
          <NavItem darkMode={darkMode} href="/">Home</NavItem>
          <NavItem darkMode={darkMode} href="/register">Sign Up</NavItem>
          <NavItem darkMode={darkMode} href="/login">Login</NavItem>
          <NavItem darkMode={darkMode} href="/admin">Admin</NavItem>
          <button 
            onClick={toggleTheme}
            className={`${darkMode ? 'bg-dark-gray-200 text-dark-white hover:bg-dark-gray-100' : 'bg-light-apricot text-white hover:bg-light-citrus'} px-3 py-1 rounded transition-colors`}
          >
            Toggle Theme
          </button>
        </div>
      </div>
    </nav>
  );
};

const NavItem = ({ darkMode, href, children }) => (
  <a href={href} className={`${darkMode ? 'text-dark-white hover:text-dark-gray-100' : 'text-white hover:text-light-applecore'}`}>{children}</a>
);

const LandingPage = () => {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

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