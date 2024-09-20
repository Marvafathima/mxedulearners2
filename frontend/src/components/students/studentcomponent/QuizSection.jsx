import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const QuizSection = ({ courseQuizzes }) => {
  const navigate = useNavigate();

  const handleStartQuiz = (quizId) => {
    navigate(`/quiz/${quizId}`);
  };

  const renderQuizButton = (quiz) => {
    if (quiz.status) {
      // Quiz has a status message
      return (
        <Button
          variant="outlined"
          color={quiz.status.includes('passed') ? 'success' : 'error'}
          disabled
        >
          {quiz.status}
        </Button>
      );
    } else {
      // Quiz is available to take
      return (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleStartQuiz(quiz.id)}
        >
          Start: {quiz.title}
        </Button>
      );
    }
  };

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-3">Quizzes</h2>
      {courseQuizzes.length > 0 ? (
        courseQuizzes.map((quiz) => (
          <div key={quiz.id} className="mb-2">
            {renderQuizButton(quiz)}
          </div>
        ))
      ) : (
        <p>No quizzes available for this course.</p>
      )}
    </div>
  );
};

export default QuizSection;