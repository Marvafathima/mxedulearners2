import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, LinearProgress } from '@mui/material';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useParams } from 'react-router-dom';
// Assume these action creators are defined in your Redux setup
import { fetchQuiz, submitQuiz, setCurrentQuestion, answerQuestion } from '../../../store/quizareaSlice';

const QuizComponent = () => {
  const dispatch = useDispatch();
  const { quizId } = useParams(); 
  const quiz = useSelector(state => state.quizarea.currentQuiz);
  const currentQuestionIndex = useSelector(state => state.quizarea.currentQuestionIndex);
  const answers = useSelector(state => state.quizarea.answers);
  const [timeLeft, setTimeLeft] = useState(null);
  console.log("quiz component mounted and quizid is",quizId)
  useEffect(() => {
    dispatch(fetchQuiz(quizId));
  }, [dispatch, quizId]);

  useEffect(() => {
    if (quiz && quiz.time_limit) {
      const timer = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 0) {
            clearInterval(timer);
            dispatch(submitQuiz());
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [quiz, dispatch]);

  const handleAnswer = (answerId) => {
    dispatch(answerQuestion({ questionId: currentQuestion.id, answerId }));
  };

  const handleNext = () => {
    dispatch(setCurrentQuestion(currentQuestionIndex + 1));
  };

  const handlePrevious = () => {
    dispatch(setCurrentQuestion(currentQuestionIndex - 1));
  };

  const handleSubmit = () => {
    dispatch(submitQuiz());
  };

  if (!quiz) return <div>Loading...</div>;

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div className="flex h-screen">
      {/* Question status sidebar */}
      <div className="w-1/4 bg-gray-100 p-4">
        <h2 className="text-xl font-bold mb-4">Questions</h2>
        <div className="grid grid-cols-5 gap-2">
          {quiz.questions.map((question, index) => (
            <button
              key={question.id}
              className={`w-10 h-10 rounded-md ${
                answers[question.id] 
                  ? 'bg-green-500' 
                  : index === currentQuestionIndex 
                  ? 'bg-yellow-500'
                  : 'bg-red-500'
              }`}
              onClick={() => dispatch(setCurrentQuestion(index))}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Main quiz area */}
      <div className="w-3/4 p-8">
        {/* Timer */}
        <div className="mb-4">
          <LinearProgress 
            variant="determinate" 
            value={(timeLeft / (quiz.time_limit * 60)) * 100} 
          />
          <p className="text-right mt-2">Time left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</p>
        </div>

        {/* Question */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{currentQuestion.text}</h2>
          {currentQuestion.answers.map(answer => (
            <Button
              key={answer.id}
              variant={answers[currentQuestion.id] === answer.id ? "contained" : "outlined"}
              className="block w-full mb-2 p-4 text-left"
              onClick={() => handleAnswer(answer.id)}
            >
              {answer.text}
            </Button>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outlined"
            startIcon={<ChevronLeft />}
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
          >
            Submit Quiz
          </Button>
          <Button
            variant="outlined"
            endIcon={<ChevronRight />}
            onClick={handleNext}
            disabled={currentQuestionIndex === quiz.questions.length - 1}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizComponent;