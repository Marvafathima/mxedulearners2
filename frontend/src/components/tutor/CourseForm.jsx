
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

  // const [lessons, setLessons] = useState([]);
  // const [showLessonForm, setShowLessonForm] = useState(false);
  // const [courseData, setCourseData] = useState({
  //   name: '',
  //   category: '',
  //   price: '',
  //   offer_percentage: '',
  //   description: '',
  //   thumbnail: null,
  //   points: 0
  // });

  // const [previewImage, setPreviewImage] = useState(null);

  const categories = [
    'Full Stack Development',
    'Frontend',
    'Backend',
    'Data Science',
    'Machine Learning',
    'Cybersecurity',
    'Mobile App Development'
  ];
 
  // const handleChange = (e) => {
  //   const { name, value, type, files } = e.target;
  //   if (type === 'file') {
  //     setCourseData(prev => ({ ...prev, [name]: files[0] }));
  //     setPreviewImage(URL.createObjectURL(files[0]));
  //   } else {
  //     setCourseData(prev => ({ ...prev, [name]: value }));
  //   }
  // };

  // const addLesson = (lessonData) => {
  //   setLessons(prev => [...prev, lessonData]);
  //   setShowLessonForm(false);
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const formData = new FormData();

  //     // Append course data
  //     Object.keys(courseData).forEach(key => {
  //       if (key === 'thumbnail' && courseData[key] instanceof File) {
  //         formData.append(key, courseData[key].name);
  //         formData.append('thumbnail_file', courseData[key]);
  //       } else if (key !== 'lessons') {
  //         formData.append(key, courseData[key]);
  //       }
  //     });

  //     formData.append('user', user.id);

  //     // Append lessons data
  //     lessons.forEach((lesson, index) => {
  //       Object.keys(lesson).forEach(key => {
  //         if (key === 'thumbnail' && lesson[key] instanceof File) {
  //           formData.append(`lessons[${index}][${key}]`, lesson[key].name);
  //           formData.append(`lessons[${index}][thumbnail_file]`, lesson[key]);
  //         } else if (key === 'video' && lesson[key] instanceof File) {
  //           formData.append(`lessons[${index}][${key}]`, lesson[key].name);
  //           formData.append(`lessons[${index}][video_file]`, lesson[key]);
  //         } else {
  //           formData.append(`lessons[${index}][${key}]`, lesson[key]);
  //         }
  //       });
  //     });

  //     console.log("Data being sent to backend:", Object.fromEntries(formData));

  //     const result = await dispatch(addCourse(formData)).unwrap();
  //     toast.success("Successfully created a course");
  //     console.log("Success:", result);
  //     // navigate('/tutor-home');
  //   } catch (error) {
  //     console.error("Failure:", error);
  //     toast.error(error.message || 'An error occurred while creating the course.');
  //   }
  // };
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

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setCourseData(prev => ({ ...prev, [name]: files[0] }));
      setPreviewImage(URL.createObjectURL(files[0]));
    } else {
      setCourseData(prev => ({ ...prev, [name]: value }));
    }
  };

  const addLesson = (lessonFormData) => {
    setLessons(prev => [...prev, lessonFormData]);
    setShowLessonForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      // Append course data
      Object.keys(courseData).forEach(key => {
        if (key === 'thumbnail' && courseData[key] instanceof File) {
          formData.append('thumbnail_file', courseData[key]);
        } else {
          formData.append(key, courseData[key]);
        }
      });

      formData.append('user', user.id);

      // Append lessons data
      lessons.forEach((lessonFormData, index) => {
        for (let [key, value] of lessonFormData.entries()) {
          formData.append(`lessons[${index}][${key}]`, value);
        }
      });

      const result = await dispatch(addCourse(formData)).unwrap();
      toast.success("Successfully created a course");
      console.log("Success:", result);
      // navigate('/tutor-home');
    } catch (error) {
      console.error("Failure:", error);
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