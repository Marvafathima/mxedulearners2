import React, { useContext } from 'react';
import { ThemeContext } from '../../../contexts/ThemeContext';
import CourseCards from '../studentcomponent/CourseCard';
import Footer from '../studentcomponent/Footer';
import Subnavbar from '../studentcomponent/SubNavbar';
import Navbar from '../studentcomponent/Navbar';
import { useSelector } from 'react-redux';
const StudentHomepage = ({ user }) => {
  const { darkMode } = useContext(ThemeContext);



  return (
    <div className={`${darkMode ? 'bg-dark-gray-300 text-dark-white' : 'bg-white text-black'}`}>
      <Navbar 
      // user={user}
       />
      <Subnavbar />
      <main className="container mx-auto px-4">
        <h1 className="text-2xl font-bold my-4">Welcome, </h1>
        {/* <Carousel /> */}
        <CourseCards />
      </main>
      <Footer />
    </div>
  );
};

export default StudentHomepage;