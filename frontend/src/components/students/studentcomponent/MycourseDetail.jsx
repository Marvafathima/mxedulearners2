
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaCheckCircle } from 'react-icons/fa';
import { fetchCourseDetail } from '../../../store/courseSlice';
import { fetchUserProgress, updateUserProgress } from '../../../store/userProgressSlice';
import Layout from './Layout';
import VideoPlayer from './VideoPlayer';
import { getFullImageUrl } from '../../ProfileImage';
const MycourseDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentCourse, status, error } = useSelector(state => state.courses);
  const { user } = useSelector((state) => state.auth);
  const { userProgress } = useSelector((state) => state.userProgress);
  const [currentLesson, setCurrentLesson] = useState(null);

  useEffect(() => {
    if (id) {
      dispatch(fetchCourseDetail(id));
      dispatch(fetchUserProgress(id));
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

  const handleProgressUpdate = (lessonId, progress) => {
    dispatch(updateUserProgress({
      courseId: id,
      lessonId,
      progress
    }));
  };

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;
  if (!currentCourse) return null;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">{currentCourse.name}</h1>
        
        <div className="flex">
          <div className="w-3/4 pr-8">
            {currentLesson && (
              <VideoPlayer
                lessonId={currentLesson.id}
                videoUrl={getFullImageUrl(currentLesson.video)}
                thumbnailUrl={getFullImageUrl(currentLesson.thumbnail)}
                onProgressUpdate={handleProgressUpdate}
                initialProgress={userProgress[currentLesson.id]?.last_watched_position || 0}
              />
            )}
          </div>
          
          <div className="w-1/4">
            <h2 className="text-2xl font-bold mb-4">Lessons</h2>
            {currentCourse.lessons.map((lesson) => (
              <div
                key={lesson.id}
                className={`flex items-center justify-between p-2 mb-2 cursor-pointer ${
                  currentLesson?.id === lesson.id ? 'bg-blue-100' : ''
                }`}
                onClick={() => handleLessonChange(lesson)}
              >
                <span>{lesson.title}</span>
                {userProgress[lesson.id]?.is_completed && (
                  <FaCheckCircle className="text-green-500" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MycourseDetail;