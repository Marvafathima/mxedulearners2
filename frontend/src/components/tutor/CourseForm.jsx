// import React, { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ThemeContext } from '../../contexts/ThemeContext';
// import LessonForm from './LessonForm';

// import { useDispatch } from 'react-redux';
// import { toast } from 'react-toastify';
// import { addCourse } from '../../store/courseSlice';
// import { getCurrentUserTokens } from '../../utils/auth';

// const CourseForm = ({ user }) => {
//   const { darkMode } = useContext(ThemeContext);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const tokens = getCurrentUserTokens();
//   const [courseData, setCourseData] = useState({
//     name: '',
//     category: '',
//     price: '',
//     offer_percentage: '',
//     description: '',
//     thumbnail: null,
//     points: 0
//   });
//   const [showLessonForm, setShowLessonForm] = useState(false);
//   const [lessons, setLessons] = useState([]);

//   const handleChange = (e) => {
//     const { name, value, type, files } = e.target;
//     setCourseData(prev => ({
//       ...prev,
//       [name]: type === 'file' ? files[0] : value
//     }));
//   };

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   // Here you would typically send the data to your backend
//   //   console.log(courseData);
//   //   console.log(lessons);
//   //   navigate('/tutor/course-preview', { state: { courseData, lessons } });
//   // };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const result = await dispatch(addCourse({ ...courseData, lessons })).unwrap();
//       toast.success('Course created successfully!');
//       navigate('/tutor/course-preview', { state: { courseData: result, lessons } });
//     } catch (error) {
//       toast.error(error.message || 'An error occurred while creating the course.');
//     }
//   };
//   const addLesson = (lessonData) => {
//     setLessons(prev => [...prev, lessonData]);
//     setShowLessonForm(false);
//   };

//   return (
//     <div className={`p-6 ${darkMode ? 'bg-dark-gray-300 text-dark-white' : 'bg-light-applecore text-light-blueberry'}`}>
//       <h2 className="text-2xl font-bold mb-4">Create New Course</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block mb-2">Course Name</label>
//           <input
//             type="text"
//             name="name"
//             value={courseData.name}
//             onChange={handleChange}
//             className={`w-full p-2 rounded ${darkMode ? 'bg-dark-gray-200' : 'bg-white'}`}
//             required
//           />
//         </div>
//         {/* Add similar input fields for category, price, offer_percentage, description */}
//         <div className="mb-4">
//           <label className="block mb-2">Thumbnail</label>
//           <input
//             type="file"
//             name="thumbnail"
//             onChange={handleChange}
//             className={`w-full p-2 rounded ${darkMode ? 'bg-dark-gray-200' : 'bg-white'}`}
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-2">Course Points</label>
//           <input
//             type="number"
//             name="points"
//             value={courseData.points}
//             onChange={handleChange}
//             className={`w-full p-2 rounded ${darkMode ? 'bg-dark-gray-200' : 'bg-white'}`}
//           />
//         </div>
//         <button
//           type="button"
//           onClick={() => setShowLessonForm(true)}
//           className={`mb-4 ${darkMode ? 'bg-dark-gray-100' : 'bg-light-citrus'} text-white p-2 rounded`}
//         >
//           Add Lesson
//         </button>
//         {lessons.length > 0 && (
//           <div className="mb-4">
//             <h3 className="font-bold mb-2">Lessons Added: {lessons.length}</h3>
//             {/* You could add a list of lesson titles here if desired */}
//           </div>
//         )}
//         <div className="flex justify-end space-x-4">
//           <button
//             type="button"
//             onClick={() => navigate('/tutor/courses')}
//             className={`${darkMode ? 'bg-dark-gray-100' : 'bg-light-apricot'} text-white p-2 rounded`}
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className={`${darkMode ? 'bg-dark-gray-100' : 'bg-light-citrus'} text-white p-2 rounded`}
//           >
//             Save and Preview
//           </button>
//         </div>
//       </form>
//       {showLessonForm && (
//         <LessonForm
//           onSave={addLesson}
//           onCancel={() => setShowLessonForm(false)}
//           lessonNumber={lessons.length + 1}
//         />
//       )}
//     </div>
//   );
// };

// export default CourseForm;

// where course created
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const formData = new FormData();
  //     Object.keys(courseData).forEach(key => {
  //       formData.append(key, courseData[key]);
  //     });
  //     formData.append('user', user.id); // Add user ID to associate the course with the user
  //     lessons.forEach((lesson, index) => {
  //       Object.keys(lesson).forEach(key => {
  //         formData.append(`lessons[${index}][${key}]`, lesson[key]);
  //       });
  //     });
   
  //     const result = await dispatch(addCourse(formData)).unwrap();
  //     console.log("success")
  //     // toast.success('Course created successfully!');
  //     // navigate('/tutor/course-preview', { state: { courseData: result, lessons } });
  //     navigate('/tutor-home')
  //   } catch (error) {
  //     console.log("failure")
     
  
  //     toast.error(error.message || 'An error occurred while creating the course.');
  //   }
  // };



 //course creation failed due to file format
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const formData = new FormData();
  //     Object.keys(courseData).forEach(key => {
  //       formData.append(key, courseData[key]);
  //     });
  //     formData.append('user', user.id);
      
  //     // Append lessons as a JSON string
  //     formData.append('lessons', JSON.stringify(lessons));
      
  //     console.log("Data being sent to backend:", {
  //       ...Object.fromEntries(formData),
  //       lessons: lessons
  //     });
  
  //     const result = await dispatch(addCourse(formData)).unwrap();
  //     console.log("Success:", result);
  //     navigate('/tutor-home');
  //   } catch (error) {
  //     console.log("Failure:", error);
  //     toast.error(error.message || 'An error occurred while creating the course.');
  //   }
  // };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const formData = new FormData();
  //     Object.keys(courseData).forEach(key => {
  //       if (key === 'thumbnail' && courseData[key] instanceof File) {
  //         formData.append(key, courseData[key], courseData[key].name);
  //       } else {
  //         formData.append(key, courseData[key]);
  //       }
  //     });
  //     formData.append('user', user.id);
      
  //     // Convert lessons to a structure that can be easily parsed in the backend
  //     const lessonsData = lessons.map(lesson => {
  //       const lessonFormData = new FormData();
  //       Object.keys(lesson).forEach(key => {
  //         if (key === 'thumbnail' && lesson[key] instanceof File) {
  //           lessonFormData.append(key, lesson[key], lesson[key].name);
  //         } else {
  //           lessonFormData.append(key, lesson[key]);
  //         }
  //       });
  //       return Object.fromEntries(lessonFormData);
  //     });
      
  //     formData.append('lessons', JSON.stringify(lessonsData));
  
  //     console.log("Data being sent to backend:", {
  //       ...Object.fromEntries(formData),
  //       lessons: lessonsData
  //     });
  
  //     const result = await dispatch(addCourse(formData)).unwrap();
  //     console.log("Success:", result);
  //     navigate('/tutor-home');
  //   } catch (error) {
  //     console.log("Failure:", error);
  //     toast.error(error.message || 'An error occurred while creating the course.');
  //   }
  // };
  //where the lesson have correct thumbanil format while course doesnt have
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const formData = new FormData();
  //     Object.keys(courseData).forEach(key => {
  //       if (key === 'thumbnail' && courseData[key] instanceof File) {
  //         formData.append(key, courseData[key], courseData[key].name);
  //       } else if (key !== 'lessons') {
  //         formData.append(key, courseData[key]);
  //       }
  //     });
  //     formData.append('user', user.id);
      
  //     // Append lessons as JSON string
  //     formData.append('lessons', JSON.stringify(lessons));
  
  //     console.log("Data being sent to backend:", Object.fromEntries(formData));
  
  //     const result = await dispatch(addCourse(formData)).unwrap();
  //     console.log("Success:", result);
  //     navigate('/tutor-home');
  //   } catch (error) {
  //     console.log("Failure:", error);
  //     toast.error(error.message || 'An error occurred while creating the course.');
  //   }
  // };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const formData = new FormData();
      
  //     // Append course data
  //     Object.keys(courseData).forEach(key => {
  //       if (key === 'thumbnail' && courseData[key] instanceof File) {
  //         formData.append(key, courseData[key], courseData[key].name);
  //       } else if (key !== 'lessons') {
  //         formData.append(key, courseData[key]);
  //       }
  //     });
      
  //     formData.append('user', user.id);
      
  //     // Prepare lessons data
  //     const lessonsData = lessons.map(lesson => {
  //       const lessonCopy = { ...lesson };
  //       if (lessonCopy.thumbnail instanceof File) {
  //         lessonCopy.thumbnail = lessonCopy.thumbnail.name;
  //       }
  //       return lessonCopy;
  //     });
      
  //     // Append lessons as a JSON string
  //     formData.append('lessons', JSON.stringify(lessonsData));
  
  //     console.log("Data being sent to backend:", Object.fromEntries(formData));
  
  //     const result = await dispatch(addCourse(formData)).unwrap();
  //     console.log("Success:", result);
  //     navigate('/tutor-home');
  //   } catch (error) {
  //     console.log("Failure:", error);
  //     toast.error(error.message || 'An error occurred while creating the course.');
  //   }
  // };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const formData = new FormData();
      
  //     // Append course data
  //     Object.keys(courseData).forEach(key => {
  //       if (key === 'thumbnail' && courseData[key] instanceof File) {
  //         formData.append(key, courseData[key], courseData[key].name);
  //       } else if (key !== 'lessons') {
  //         formData.append(key, courseData[key]);
  //       }
  //     });
      
  //     formData.append('user', user.id);
      
  //     // Append lessons data
  //     lessons.forEach((lesson, index) => {
  //       Object.keys(lesson).forEach(key => {
  //         if (key === 'thumbnail' && lesson[key] instanceof File) {
  //           formData.append(`lessons[${index}][${key}]`, lesson[key], lesson[key].name);
  //         } else {
  //           formData.append(`lessons[${index}][${key}]`, lesson[key]);
  //         }
  //       });
  //     });
  
  //     console.log("Data being sent to backend:", Object.fromEntries(formData));
  
  //     const result = await dispatch(addCourse(formData)).unwrap();
  //     console.log("Success:", result);
  //     navigate('/tutor-home');
  //   } catch (error) {
  //     console.log("Failure:", error);
  //     toast.error(error.message || 'An error occurred while creating the course.');
  //   }
  // };
  import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../contexts/ThemeContext';
import { useDispatch} from 'react-redux';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import TutorSidebar from './TutorSidebar';
import { addCourse } from '../../store/courseSlice';
// import { getCurrentUserTokens } from '../../utils/auth';
import LessonForm from './LessonForm';


const CourseForm = () => {
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user); // Assuming you have user info in Redux state

  const [lessons, setLessons] = useState([]);
  const [showLessonForm, setShowLessonForm] = useState(false);
  const [courseData, setCourseData] = useState({
    name: '',
    category: '',
    price: '',
    offer_percentage: '',
    description: '',
    thumbnail: null,
    points: 0
  });

  const [previewImage, setPreviewImage] = useState(null);

  const categories = [
    'Full Stack Development',
    'Frontend',
    'Backend',
    'Data Science',
    'Machine Learning',
    'Cybersecurity',
    'Mobile App Development'
  ];
 
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setCourseData(prev => ({ ...prev, [name]: files[0] }));
      setPreviewImage(URL.createObjectURL(files[0]));
    } else {
      setCourseData(prev => ({ ...prev, [name]: value }));
    }
  };

  const addLesson = (lessonData) => {
    setLessons(prev => [...prev, lessonData]);
    setShowLessonForm(false);
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      
      // Append course data
      Object.keys(courseData).forEach(key => {
        if (key === 'thumbnail' && courseData[key] instanceof File) {
          // Save the thumbnail filename instead of the file
          formData.append(key, courseData[key].name);
          // Append the actual file with a different key
          formData.append('thumbnail_file', courseData[key], courseData[key].name);
        } else if (key !== 'lessons') {
          formData.append(key, courseData[key]);
        }
      });
      
      formData.append('user', user.id);
      
      // Append lessons data
      lessons.forEach((lesson, index) => {
        Object.keys(lesson).forEach(key => {
          if (key === 'thumbnail' && lesson[key] instanceof File) {
            formData.append(`lessons[${index}][${key}]`, lesson[key].name);
            formData.append(`lessons[${index}][thumbnail_file]`, lesson[key], lesson[key].name);
          } else {
            formData.append(`lessons[${index}][${key}]`, lesson[key]);
          }
        });
      });
  
      console.log("Data being sent to backend:", Object.fromEntries(formData));
  
      const result = await dispatch(addCourse(formData)).unwrap();
      console.log("Success:", result);
      navigate('/tutor-home');
    } catch (error) {
      console.log("Failure:", error);
      toast.error(error.message || 'An error occurred while creating the course.');
    }
  };
  return (
    <div className="flex">
      <div className="fixed h-screen">
        <TutorSidebar user={user} />
      </div>
      <div className="flex-grow ml-64 p-6 overflow-y-auto">
    <div className={`max-w-3xl mx-auto p-6 ${darkMode ? 'bg-dark-gray-300 text-dark-white' : 'bg-light-ash text-light-blueberry'}`}>
      <h2 className="text-2xl font-bold mb-4">Create New Course</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Course Name</label>
          <input
            type="text"
            name="name"
            value={courseData.name}
            onChange={handleChange}
            className={`w-full p-2 rounded ${darkMode ? 'bg-dark-gray-200' : 'bg-white'}`}
            required
          />
        </div>
        <div>
          <label className="block mb-2">Category</label>
          <select
            name="category"
            value={courseData.category}
            onChange={handleChange}
            className={`w-full p-2 rounded ${darkMode ? 'bg-dark-gray-200' : 'bg-white'}`}
            required
          >
            <option value="">Select a category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={courseData.price}
            onChange={handleChange}
            className={`w-full p-2 rounded ${darkMode ? 'bg-dark-gray-200' : 'bg-white'}`}
            required
          />
        </div>
        <div>
          <label className="block mb-2">Offer Percentage</label>
          <input
            type="number"
            name="offer_percentage"
            value={courseData.offer_percentage}
            onChange={handleChange}
            className={`w-full p-2 rounded ${darkMode ? 'bg-dark-gray-200' : 'bg-white'}`}
          />
        </div>
        <div>
          <label className="block mb-2">Description</label>
          <textarea
            name="description"
            value={courseData.description}
            onChange={handleChange}
            className={`w-full p-2 rounded ${darkMode ? 'bg-dark-gray-200' : 'bg-white'}`}
            rows="4"
            required
          ></textarea>
        </div>
        <div>
          <label className="block mb-2">Thumbnail</label>
          <input
            type="file"
            name="thumbnail"
            onChange={handleChange}
            className={`w-full p-2 rounded ${darkMode ? 'bg-dark-gray-200' : 'bg-white'}`}
            accept="image/*"
          />
          {previewImage && (
            <img src={previewImage} alt="Thumbnail preview" className="mt-2 max-w-xs" />
          )}
        </div>
        <div>
          <label className="block mb-2">Course Points</label>
          <input
            type="number"
            name="points"
            value={courseData.points}
            onChange={handleChange}
            className={`w-full p-2 rounded ${darkMode ? 'bg-dark-gray-200' : 'bg-white'}`}
          />
        </div>
        <div>
          <button
            type="button"
            onClick={() => setShowLessonForm(true)}
            className={`${darkMode ? 'bg-dark-gray-100' : 'bg-light-citrus'} text-white p-2 rounded`}
          >
            Add Lesson
          </button>
        </div>

        {lessons.length > 0 && (
          <div>
            <h3 className="font-bold mb-2">Lessons Added: {lessons.length}</h3>
            <ul>
              {lessons.map((lesson, index) => (
                <li key={index}>{lesson.title}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/tutor/courses')}
            className={`${darkMode ? 'bg-dark-gray-100' : 'bg-light-apricot'} text-white p-2 rounded`}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`${darkMode ? 'bg-dark-gray-100' : 'bg-light-citrus'} text-white p-2 rounded`}
          >
            Save and Preview
          </button>
        </div>
      </form>

      {showLessonForm && (
        <LessonForm
          onSave={addLesson}
          onCancel={() => setShowLessonForm(false)}
          lessonNumber={lessons.length + 1}
        />
      )}
    </div> </div> </div> 
  );
};

    

export default CourseForm;