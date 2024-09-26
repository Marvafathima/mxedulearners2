import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaPlus, FaMinus, FaEdit, FaTrash } from 'react-icons/fa';
import TutorSidebar from './TutorSidebar';
// Assume you have actions for fetching courses and saving quizzes
import { fetchTutorCourses } from '../../store/courseSlice';
import { fetchQuizzes, addQuiz, updateQuiz, deleteQuiz  } from '../../store/quizSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const QuizCreationForm = () => {
  const dispatch = useDispatch();
  const { courses, coursestatus, courseerror } = useSelector(state => state.courses);
  const navigate=useNavigate();
  const user = useSelector(state => state.auth.user);
  const { quizzes, status, error } = useSelector(state => state.quizzes);
  const [quizData, setQuizData] = useState({
    title: '',
    courseId: '',
    timeLimit: { hours: 0, minutes: 0, seconds: 0 },
    description: '',
    questions: []
  });

  const [currentQuestion, setCurrentQuestion] = useState({
    question: '',
    options: ['', ''],
    correctOption: 0,
    marks: 1,
    negativeMarks: 0
  });

  useEffect(() => {
    dispatch(fetchTutorCourses());
  }, [dispatch]);


  useEffect(() => {
    dispatch(fetchQuizzes());
  }, [dispatch]);

  const handleAddQuiz = (quizData) => {
    dispatch(addQuiz(quizData));
  };

  const handleUpdateQuiz = (id, quizData) => {
    dispatch(updateQuiz({ id, quizData }));
  };

  const handleDeleteQuiz = (id) => {
    dispatch(deleteQuiz(id));
  };









  const handleQuizDataChange = (e) => {
    const { name, value } = e.target;
    setQuizData(prev => ({ ...prev, [name]: value }));
  };

  const handleTimeChange = (unit, value) => {
    setQuizData(prev => ({
      ...prev,
      timeLimit: { ...prev.timeLimit, [unit]: parseInt(value) || 0 }
    }));
  };

  const handleQuestionChange = (e) => {
    const { name, value } = e.target;
    setCurrentQuestion(prev => ({ ...prev, [name]: value }));
  };

  const handleOptionChange = (index, value) => {
    setCurrentQuestion(prev => ({
      ...prev,
      options: prev.options.map((opt, i) => i === index ? value : opt)
    }));
  };

  const addOption = () => {
    setCurrentQuestion(prev => ({
      ...prev,
      options: [...prev.options, '']
    }));
  };

  const removeOption = (index) => {
    setCurrentQuestion(prev => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index)
    }));
  };

  const saveQuestion = () => {
    setQuizData(prev => ({
      ...prev,
      questions: [...prev.questions, currentQuestion]
    }));
    setCurrentQuestion({
      question: '',
      options: ['', ''],
      correctOption: 0,
      marks: 1,
      negativeMarks: 0
    });
  };

  const editQuestion = (index) => {
    setCurrentQuestion(quizData.questions[index]);
    setQuizData(prev => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index)
    }));
  };

  const deleteQuestion = (index) => {
    setQuizData(prev => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try{
      dispatch(addQuiz(quizData)).unwrap();
      toast.success("Quiz created Successfully")
      navigate('/tutor/quiz_list/')
    }
    catch(error){
     toast.error(`Error in creating Quiz.${error}`)
    }
   
    
  };

  return (
    <div className="flex bg-blue min-h-screen">
      <TutorSidebar user={user} />
      <div className="flex-grow p-6 ml-64 bg-light-ash">
        <h1 className="text-2xl font-bold mb-6">Create New Quiz</h1>
        <div className="flex space-x-6">
          <form onSubmit={handleSubmit} className="w-1/2 bg-dark-gray-100 p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <label className="block mb-2 font-bold">Quiz Title</label>
              <input
                type="text"
                name="title"
                value={quizData.title}
                onChange={handleQuizDataChange}
                className="w-full p-2 border rounded text-black"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-bold">Course</label>
              <select
                name="courseId"
                value={quizData.courseId}
                onChange={handleQuizDataChange}
                className="w-full p-2 border rounded text-black"
                required
              >
                <option value="">Select a course</option>
                {courses.map(course => (
                  <option key={course.id} value={course.id}>{course.name}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-bold">Time Limit</label>
              <div className="flex space-x-2">
                {['hours', 'minutes', 'seconds'].map(unit => (
                  <input
                    key={unit}
                    type="number"
                    value={quizData.timeLimit[unit]}
                    onChange={(e) => handleTimeChange(unit, e.target.value)}
                    className="w-20 p-2 border rounded text-black"
                    min="0"
                    placeholder={unit}
                  />
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-bold">Description</label>
              <textarea
                name="description"
                value={quizData.description}
                onChange={handleQuizDataChange}
                className="w-full p-2 border rounded text-black"
                rows="3"
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-bold">Question</label>
              <input
                type="text"
                name="question"
                value={currentQuestion.question}
                onChange={handleQuestionChange}
                className="w-full p-2 border rounded text-black"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-bold">Options</label>
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="radio"
                    name="correctOption"
                    value={index}
                    checked={currentQuestion.correctOption === index}
                    onChange={() => setCurrentQuestion(prev => ({ ...prev, correctOption: index }))}
                    className="mr-2 text-black"
                  />
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    className="flex-grow p-2 border rounded text-black"
                  />
                  {index > 1 && (
                    <button type="button" onClick={() => removeOption(index)} className="ml-2 text-red-500">
                      <FaMinus />
                    </button>
                  )}
                </div>
              ))}
              <button type="button" onClick={addOption} className="text-yellow-200">
                <FaPlus /> Add Option
              </button>
            </div>
            <div className="mb-4 flex space-x-4">
              <div>
                <label className="block mb-2 font-bold">Marks</label>
                <input
                  type="number"
                  name="marks"
                  value={currentQuestion.marks}
                  onChange={handleQuestionChange}
                  className="w-20 p-2 border rounded"
                  min="0"
                />
              </div>
              <div>
                <label className="block mb-2 font-bold">Negative Marks</label>
                <input
                  type="number"
                  name="negativeMarks"
                  value={currentQuestion.negativeMarks}
                  onChange={handleQuestionChange}
                  className="w-20 p-2 border rounded"
                  min="0"
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={saveQuestion}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Save Question
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Finish Quiz
              </button>
            </div>
          </form>
          <div className="w-1/2 bg-dark-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Question Preview</h2>
            {quizData.questions.map((q, index) => (
              <div key={index} className="mb-4 p-4 border rounded">
                <p className="font-bold">{q.question}</p>
                <ul className="list-disc pl-5 mt-2">
                  {q.options.map((opt, i) => (
                    <li key={i} className={i === q.correctOption ? "text-green-500" : ""}>
                      {opt}
                    </li>
                  ))}
                </ul>
                <p className="mt-2">Marks: {q.marks}, Negative Marks: {q.negativeMarks}</p>
                <div className="mt-2 flex space-x-2">
                  <button onClick={() => editQuestion(index)} className="text-blue-500">
                    <FaEdit />
                  </button>
                  <button onClick={() => deleteQuestion(index)} className="text-red-500">
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizCreationForm;

// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { FaPlus, FaMinus, FaEdit, FaTrash } from 'react-icons/fa';
// import TutorSidebar from './TutorSidebar';
// import { fetchTutorCourses } from '../../store/courseSlice';
// import { fetchQuizzes, addQuiz, updateQuiz, deleteQuiz } from '../../store/quizSlice';

// const QuizCreationForm = () => {
//   const dispatch = useDispatch();
//   const { courses, status: courseStatus, error: courseError } = useSelector(state => state.courses);
//   const { quizzes, status: quizStatus, error: quizError } = useSelector(state => state.quizzes);
//   const user = useSelector(state => state.auth.user);

//   const [quizData, setQuizData] = useState({
//     title: '',
//     courseId: '', // Changed from courseId to course to match API
//     timeLimit: { hours: 0, minutes: 0, seconds: 0 },
//     description: '',
//     questions: []
//   });

//   const [currentQuestion, setCurrentQuestion] = useState({
//     question: '',
//     options: ['', ''],
//     correctOption: 0,
//     marks: 1,
//     negativeMarks: 0
//   });

//   useEffect(() => {
//     dispatch(fetchTutorCourses());
//     dispatch(fetchQuizzes());
//   }, [dispatch]);

//   const handleQuizDataChange = (e) => {
//     const { name, value } = e.target;
//     setQuizData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleTimeChange = (unit, value) => {
//     setQuizData(prev => ({
//       ...prev,
//       timeLimit: { ...prev.timeLimit, [unit]: parseInt(value, 10) || 0 }
//     }));
//   };

//   const handleQuestionChange = (e) => {
//     const { name, value } = e.target;
//     setCurrentQuestion(prev => ({ ...prev, [name]: value }));
//   };

//   const handleOptionChange = (index, value) => {
//     setCurrentQuestion(prev => ({
//       ...prev,
//       options: prev.options.map((opt, i) => i === index ? value : opt)
//     }));
//   };

//   const addOption = () => {
//     setCurrentQuestion(prev => ({
//       ...prev,
//       options: [...prev.options, '']
//     }));
//   };

//   const removeOption = (index) => {
//     setCurrentQuestion(prev => ({
//       ...prev,
//       options: prev.options.filter((_, i) => i !== index)
//     }));
//   };

//   const saveQuestion = () => {
//     setQuizData(prev => ({
//       ...prev,
//       questions: [...prev.questions, { ...currentQuestion, correctOption: currentQuestion.options.indexOf(currentQuestion.options[currentQuestion.correctOption]) }]
//     }));
//     setCurrentQuestion({
//       question: '',
//       options: ['', ''],
//       correctOption: 0,
//       marks: 1,
//       negativeMarks: 0
//     });
//   };

//   const editQuestion = (index) => {
//     setCurrentQuestion(quizData.questions[index]);
//     setQuizData(prev => ({
//       ...prev,
//       questions: prev.questions.filter((_, i) => i !== index)
//     }));
//   };

//   const deleteQuestion = (index) => {
//     setQuizData(prev => ({
//       ...prev,
//       questions: prev.questions.filter((_, i) => i !== index)
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formattedData = {
//       ...quizData,
//       creator: user.id, // Ensure creator ID is included
//       time_limit: `${quizData.timeLimit.hours}:${quizData.timeLimit.minutes}:${quizData.timeLimit.seconds}`, // Correct time format
//     };
//     dispatch(addQuiz(formattedData));
//     // Reset form or navigate to quiz list
//   };

//   return (
//     <div className="flex bg-gray-100 min-h-screen">
//       <TutorSidebar user={user} />
//       <div className="flex-grow p-6 ml-64">
//         <h1 className="text-2xl font-bold mb-6">Create New Quiz</h1>
//         <div className="flex space-x-6">
//           <form onSubmit={handleSubmit} className="w-1/2 bg-white p-6 rounded-lg shadow-md">
//             <div className="mb-4">
//               <label className="block mb-2 font-bold">Quiz Title</label>
//               <input
//                 type="text"
//                 name="title"
//                 value={quizData.title}
//                 onChange={handleQuizDataChange}
//                 className="w-full p-2 border rounded"
//                 required
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block mb-2 font-bold">Course</label>
//               <select
//                 name="courseId"
//                 value={quizData.courseId}
//                 onChange={handleQuizDataChange}
//                 className="w-full p-2 border rounded"
//                 required
//               >
//                 <option value="">Select a course</option>
//                 {courses.map(course => (
//                   <option key={course.id} value={course.id}>{course.name}</option>
//                 ))}
//               </select>
//             </div>
//             <div className="mb-4">
//               <label className="block mb-2 font-bold">Time Limit</label>
//               <div className="flex space-x-2">
//                 {['hours', 'minutes', 'seconds'].map(unit => (
//                   <input
//                     key={unit}
//                     type="number"
//                     value={quizData.timeLimit[unit]}
//                     onChange={(e) => handleTimeChange(unit, e.target.value)}
//                     className="w-20 p-2 border rounded"
//                     min="0"
//                     placeholder={unit}
//                   />
//                 ))}
//               </div>
//             </div>
//             <div className="mb-4">
//               <label className="block mb-2 font-bold">Description</label>
//               <textarea
//                 name="description"
//                 value={quizData.description}
//                 onChange={handleQuizDataChange}
//                 className="w-full p-2 border rounded"
//                 rows="3"
//               ></textarea>
//             </div>
//             <div className="mb-4">
//               <label className="block mb-2 font-bold">Question</label>
//               <input
//                 type="text"
//                 name="question"
//                 value={currentQuestion.question}
//                 onChange={handleQuestionChange}
//                 className="w-full p-2 border rounded"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block mb-2 font-bold">Options</label>
//               {currentQuestion.options.map((option, index) => (
//                 <div key={index} className="flex items-center mb-2">
//                   <input
//                     type="radio"
//                     name="correctOption"
//                     value={index}
//                     checked={currentQuestion.correctOption === index}
//                     onChange={() => setCurrentQuestion(prev => ({ ...prev, correctOption: index }))}
//                     className="mr-2"
//                   />
//                   <input
//                     type="text"
//                     value={option}
//                     onChange={(e) => handleOptionChange(index, e.target.value)}
//                     className="flex-grow p-2 border rounded"
//                   />
//                   {index > 1 && (
//                     <button type="button" onClick={() => removeOption(index)} className="ml-2 text-red-500">
//                       <FaMinus />
//                     </button>
//                   )}
//                 </div>
//               ))}
//               <button type="button" onClick={addOption} className="text-blue-500">
//                 <FaPlus /> Add Option
//               </button>
//             </div>
//             <div className="mb-4 flex space-x-4">
//               <div>
//                 <label className="block mb-2 font-bold">Marks</label>
//                 <input
//                   type="number"
//                   name="marks"
//                   value={currentQuestion.marks}
//                   onChange={handleQuestionChange}
//                   className="w-20 p-2 border rounded"
//                   min="0"
//                 />
//               </div>
//               <div>
//                 <label className="block mb-2 font-bold">Negative Marks</label>
//                 <input
//                   type="number"
//                   name="negativeMarks"
//                   value={currentQuestion.negativeMarks}
//                   onChange={handleQuestionChange}
//                   className="w-20 p-2 border rounded"
//                   min="0"
//                 />
//               </div>
//             </div>
//             <div className="flex space-x-4">
//               <button
//                 type="button"
//                 onClick={saveQuestion}
//                 className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//               >
//                 Save Question
//               </button>
//               <button
//                 type="submit"
//                 className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//               >
//                 Finish Quiz
//               </button>
//             </div>
//           </form>
//           <div className="w-1/2 bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-xl font-bold mb-4">Question Preview</h2>
//             {quizData.questions.map((q, index) => (
//               <div key={index} className="mb-4 p-4 border rounded">
//                 <p className="font-bold">{q.question}</p>
//                 <ul className="list-disc pl-5 mt-2">
//                   {q.options.map((opt, i) => (
//                     <li key={i} className={i === q.correctOption ? "text-green-500" : ""}>
//                       {opt}
//                     </li>
//                   ))}
//                 </ul>
//                 <p className="mt-2">Marks: {q.marks}, Negative Marks: {q.negativeMarks}</p>
//                 <div className="mt-2 flex space-x-2">
//                   <button onClick={() => editQuestion(index)} className="text-blue-500">
//                     <FaEdit />
//                   </button>
//                   <button onClick={() => deleteQuestion(index)} className="text-red-500">
//                     <FaTrash />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default QuizCreationForm;
