

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaCheckCircle } from 'react-icons/fa';
import { fetchCourseDetail } from '../../../store/courseSlice';
import { fetchUserProgress, updateUserProgress } from '../../../store/userProgressSlice';
import Layout from './Layout';
import VideoPlayer from './VideoPlayer';
import { getFullImageUrl } from '../../../components/ProfileImage';
import { Button } from '@mui/material';
import { fetchCourseQuizzes } from '../../../store/quizareaSlice';
import { useNavigate } from 'react-router-dom';
import QuizSection from './QuizSection';  // Adjust the import path as needed
const MycourseDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentCourse, status, error } = useSelector(state => state.courses);
  const { userProgress } = useSelector((state) => state.userProgress);
  const [currentLesson, setCurrentLesson] = useState(null);
  const { courseQuizzes, quizstatus, quizerror } = useSelector(state => state.quizarea);
  const navigate=useNavigate();
  useEffect(() => {
    if (id) {
      dispatch(fetchCourseDetail(id));
      dispatch(fetchUserProgress(id));
      dispatch(fetchCourseQuizzes(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (currentCourse && currentCourse.lessons.length > 0) {
      setCurrentLesson(currentCourse.lessons[0]);
    }
  }, [currentCourse]);

  const handleLessonChange = (lesson) => {
    setCurrentLesson(lesson);
  };

  const handleProgressUpdate = (lessonId, currentTime) => {
    const lesson = currentCourse.lessons.find(l => l.id === lessonId);
    if (lesson) {
      const progress = {
        last_watched_position: currentTime,
        is_completed: currentTime >= lesson.duration,
        progress_percentage: (currentTime / lesson.duration) * 100
      };
      dispatch(updateUserProgress({ courseId: id, lessonId, progress }));
    }
  };
  console.log("course quize detail fetched",courseQuizzes)

  const handleStartQuiz = (quizId) => {
    navigate(`/quiz/${quizId}`);
  };

  if (quizstatus === 'loading') {
    return <div>Loading quizzes...</div>;
  }

  if (quizstatus === 'failed') {
    return <div>Error: {error}</div>;
  }

  if (status === 'loading') return <div className="text-center py-4">Loading...</div>;
  if (status === 'failed') return <div className="text-center py-4 text-red-500">Error: {error}</div>;
  if (!currentCourse) return null;

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">{currentCourse.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentLesson && (
          <div className="col-span-1">
            <VideoPlayer
           
                               lessonId={currentLesson.id}
               videoUrl={getFullImageUrl(currentLesson.video)}
                thumbnailUrl={getFullImageUrl(currentLesson.thumbnail)}
                  onProgressUpdate={handleProgressUpdate}
                  initialProgress={userProgress[currentLesson.id]?.last_watched_position || 0}
     
            />
          </div>
        )}
        <div className="col-span-1">
          <h2 className="text-xl font-semibold mb-3">Lessons</h2>
          {currentCourse.lessons.map((lesson) => (
            <div
              key={lesson.id}
              className={`mb-4 p-3 border border-gray-200 rounded-lg cursor-pointer transition-colors ${
                currentLesson?.id === lesson.id ? 'bg-blue-50' : 'hover:bg-gray-50'
              }`}
              onClick={() => handleLessonChange(lesson)}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg text-gray-400 font-medium">{lesson.title}</h3>
                {userProgress[lesson.id]?.is_completed && (
                  <FaCheckCircle className="text-green-500" />
                )}
              </div>
              <p className="text-sm text-gray-600 mb-2">{lesson.description}</p>
              <div className="relative pt-1">
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                  <div 
                    style={{ width: `${userProgress[lesson.id]?.progress_percentage || 0}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                  ></div>
                </div>
                <span className="text-xs font-semibold inline-block text-blue-600">
                  {Math.round(userProgress[lesson.id]?.progress_percentage || 0)}% Complete
                </span>
              </div>
             
            </div>
          ))}
          {/* <QuizSection courseQuizzes={courseQuizzes} /> */}

          <QuizSection courseQuizzes={courseQuizzes} currentCourse={currentCourse} />
          {/* {courseQuizzes.map(quiz=>(

          <Button variant="contained"  color="success"
          key={quiz.id} 
          onClick={() => handleStartQuiz(quiz.id)}
         >
          Start: {quiz.title}
          </Button> 
          ))} */}
         
        </div>
      </div>
    </Layout>
  );
};

export default MycourseDetail;

