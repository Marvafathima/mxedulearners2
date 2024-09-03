
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaCheckCircle } from 'react-icons/fa';
import { fetchCourseDetail } from '../../../store/courseSlice';
import { fetchUserProgress, updateUserProgress } from '../../../store/userProgressSlice';
import Layout from './Layout';
import VideoPlayer from './VideoPlayer';
import { getFullImageUrl } from '../../../components/ProfileImage'
const MycourseDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentCourse, status, error } = useSelector(state => state.courses);
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
    // if (currentLesson) {
    //   // Update progress when changing lessons
    //   console.log(`lesson id is ${currentLesson.id}`)
    //   handleProgressUpdate(currentLesson.id, {
    //     last_watched_position: videoRef.current.currentTime,
    //     is_completed: videoRef.current.currentTime >= currentLesson.duration,
    //     progress_percentage: (videoRef.current.currentTime / currentLesson.duration) * 100
    //   });
    // }
    setCurrentLesson(lesson);
  };

//   const handleProgressUpdate = (lessonId, progress) => {
//     console.log("lesson id:",lessonId)
//     dispatch(updateUserProgress({
//       courseId: id,
//       lessonId,
//       progress
//     }));
//   };
const handleProgressUpdate = (lessonId, currentTime) => {
    const lesson = currentCourse.lessons.find(l => l.id === lessonId);
    if (lesson) {
      const progress = {
        last_watched_position: currentTime,
        is_completed: currentTime >= lesson.duration,
        progress_percentage: (currentTime / lesson.duration) * 100
      };
      dispatch(updateUserProgress({
        courseId: id,
        lessonId,
        progress
      }));
    }
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
                // totalDuration={currentLesson.duration}
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
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { FaCheckCircle } from 'react-icons/fa';
// import { fetchCourseDetail, updateUserProgress } from '../../../store/userProgressSlice';
// import Layout from './Layout';
// import VideoPlayer from './VideoPlayer';
// import { getFullImageUrl } from '../../../components/ProfileImage'
// const MycourseDetail = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const { currentCourse, lessons, status, error } = useSelector(state => state.userProgress);
//   const [currentLesson, setCurrentLesson] = useState(null);

//   useEffect(() => {
//     if (id) {
//       dispatch(fetchCourseDetail(id));
//     }
//   }, [dispatch, id]);

//   useEffect(() => {
//     if (lessons && lessons.length > 0) {
//       setCurrentLesson(lessons[0]);
//     }
//   }, [lessons]);

//   const handleLessonChange = (lesson) => {
//     setCurrentLesson(lesson);
//   };

//   const handleProgressUpdate = (lessonId, progress) => {
//     dispatch(updateUserProgress({
//       courseId: id,
//       lessonId,
//       progress
//     }));
//   };

//   if (status === 'loading') return <div>Loading...</div>;
//   if (status === 'failed') return <div>Error: {error}</div>;
//   if (!currentCourse || !lessons) return null;

//   return (
//     <Layout>
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-4xl font-bold mb-8">{currentCourse.name}</h1>
        
//         <div className="flex">
//           <div className="w-3/4 pr-8">
//             {currentLesson && (
//               <VideoPlayer
//                 lessonId={currentLesson.id}
//                 videoUrl={getFullImageUrl(currentLesson.video)}
//                 thumbnailUrl={getFullImageUrl(currentLesson.thumbnail)}
//                 onProgressUpdate={handleProgressUpdate}
//                 initialProgress={currentLesson.user_progress?.last_watched_position || 0}
//                 totalDuration={currentLesson.duration}
//               />
//             )}
//           </div>
          
//           <div className="w-1/4">
//             <h2 className="text-2xl font-bold mb-4">Lessons</h2>
//             {lessons.map((lesson) => (
//               <div
//                 key={lesson.id}
//                 className={`flex items-center justify-between p-2 mb-2 cursor-pointer ${
//                   currentLesson?.id === lesson.id ? 'bg-blue-100' : ''
//                 }`}
//                 onClick={() => handleLessonChange(lesson)}
//               >
//                 <span>{lesson.title}</span>
//                 {lesson.user_progress?.is_completed && (
//                   <FaCheckCircle className="text-green-500" />
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default MycourseDetail;