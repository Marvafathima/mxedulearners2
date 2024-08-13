import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { store } from './store/store';
import LandingPage from './components/Landing';
import { ThemeProvider } from './contexts/ThemeContext';
import Home  from './components/Home';
import ProtectedAdminRoute from './components/routes/ProtectedAdminRoute';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminLoginPage from './components/admin/AdminLoginPage';
import RequestTutorPage from './components/admin/tutors/RequestTutorPage';
import TutorHome from './components/tutor/TutorHome';
import ProtectedUserRoute from './components/routes/ProtectedUserRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CourseForm from './components/tutor/CourseForm';
import StudentHomepage from './components/students/studentpages/StudentHomepage';
import { useContext } from 'react';
import { ThemeContext } from './contexts/ThemeContext';
import ToastWrapper from './components/ToastWrapper';
import StudentProfile from './components/students/studentcomponent/StudentProfile';
import TutorList from './components/admin/tutors/TutorList';
import StudentList from './components/admin/student/StudentList';
function App() {
  // const { darkMode } = useContext(ThemeContext);
  return (
    <Provider store={store}>
       <ThemeProvider>
       
      <Router>
        <div className="App">
          <Routes>
            <Route path="/landing-page" element={<LandingPage/>} />
          
            <Route path="/admin/login" element={<AdminLoginPage />} />


            <Route element={<ProtectedUserRoute allowedRoles={['tutor']} />}>
          <Route path="/tutor-home" element={<TutorHome />} />
           <Route path="/tutor/create-course" element={<CourseForm/>} />
         {/* <Route path="/tutor/course-preview" element={<CoursePreview />} /> */}
        </Route>

        <Route element={<ProtectedUserRoute allowedRoles={['student']} />}>
          <Route path="/student-home" element={<StudentHomepage />} />
          <Route path="/student/profile" element={<StudentProfile />} />
        </Route>

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
  <Route path="/admin/tutorlist"  
            element={
                <ProtectedAdminRoute>
                  <TutorList />
                </ProtectedAdminRoute>
              } 
            />
 <Route path="/admin/students"  
            element={
                <ProtectedAdminRoute>
                  <StudentList />
                </ProtectedAdminRoute>
              } 
            />





          </Routes>
        </div>
      </Router>
      <ToastWrapper />
      {/* <ToastContainer theme={darkMode ? 'light' : 'dark'} /> */}
      </ThemeProvider>
    
    </Provider>
  );
}

export default App;
