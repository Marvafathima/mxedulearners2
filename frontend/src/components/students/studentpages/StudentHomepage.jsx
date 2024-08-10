import React, { useContext,useEffect } from 'react';
import { ThemeContext } from '../../../contexts/ThemeContext';
import CourseCards from '../studentcomponent/CourseCard';
import Footer from '../studentcomponent/Footer';
import Subnavbar from '../studentcomponent/SubNavbar';
import Navbar from '../studentcomponent/Navbar';
import { useSelector,useDispatch} from 'react-redux';
import { fetchStudentDetails } from '../../../store/authSlice'
const StudentHomepage = () => {
  const { darkMode } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchStudentDetails());
  }, [dispatch]);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className={`${darkMode ? 'bg-dark-gray-300 text-dark-white' : 'bg-white text-black'}`}>
      <Navbar 
      user={user}
       />
      <Subnavbar />
      <main className="container mx-auto px-4">
        <h1 className="text-2xl font-bold my-4">Welcome, {user?.username} </h1>
        {/* <Carousel /> */}
        <CourseCards />
      </main>
      <Footer />
    </div>
  );
};

export default StudentHomepage;