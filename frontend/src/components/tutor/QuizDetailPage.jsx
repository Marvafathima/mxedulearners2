import React, { useState } from 'react';
import { Typography, Box, Card, CardContent, Chip, Pagination } from '@mui/material';
import TutorNavbar from './TutorNavbar';
import TutorSidebar from './TutorSidebar';
import { useLocation } from 'react-router-dom';
import { useSelector} from 'react-redux';
const QuizDetailPage = () => {
    const location = useLocation();
    const { quizData } = location.state || {};  // Extract quizData from location state
    const {user}=useSelector((state)=>state.auth)
  const [page, setPage] = useState(1);
  const questionsPerPage = 5;

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * questionsPerPage;
  const endIndex = startIndex + questionsPerPage;
  const displayedQuestions = quizData.questions.slice(startIndex, endIndex);

  return (
    <div className="flex h-screen bg-gray-100">
      <TutorSidebar user={user}/>
      <div className="flex flex-col flex-grow">
        <TutorNavbar  user={user}/>
        <div className="p-6 overflow-auto">
          <Typography variant="h4" className="mb-4 text-gray-800">
            {quizData.title}
          </Typography>
          <Card className="mb-6">
            <CardContent>
              <Typography variant="h6" className="mb-2">
                Course: {quizData.course}
              </Typography>
              <Typography variant="body1" className="mb-2">
                Description: {quizData.description}
              </Typography>
              <Typography variant="body2" className="mb-2">
                Time Limit: {quizData.time_limit}
              </Typography>
              <Typography variant="body2" className="mb-2">
                Total Points: {quizData.points}
              </Typography>
              <Typography variant="body2">
                Total Questions: {quizData.questions.length}
              </Typography>
            </CardContent>
          </Card>

          {displayedQuestions.map((question, index) => (
            <Card key={question.id} className="mb-4">
              <CardContent>
                <Typography variant="h6" className="mb-2">
                  Question {startIndex + index + 1}: {question.text}
                </Typography>
                <Typography variant="body2" className="mb-2">
                  Marks: {question.marks} | Negative Marks: {question.negative_marks}
                </Typography>
                <Box className="space-y-2">
                  {question.options.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Chip
                        label={option.text}
                        color={option.is_correct ? "success" : "default"}
                        variant={option.is_correct ? "filled" : "outlined"}
                      />
                      {option.is_correct && (
                        <Typography variant="body2" className="text-green-600">
                          (Correct Answer)
                        </Typography>
                      )}
                    </div>
                  ))}
                </Box>
              </CardContent>
            </Card>
          ))}

          {quizData.questions.length > questionsPerPage && (
            <Box className="flex justify-center mt-4">
              <Pagination
                count={Math.ceil(quizData.questions.length / questionsPerPage)}
                page={page}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizDetailPage;