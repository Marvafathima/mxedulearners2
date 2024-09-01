import React, { useEffect } from 'react';
import { Box, Typography, Button, Card, CardContent, LinearProgress, Grid, Container, Paper } from '@mui/material';
import { CheckCircle, PlayArrow, EmojiEvents } from '@mui/icons-material';
import Navbar from './Navbar'; // Assuming you have this component
import Footer from './Footer'; // Assuming you have this component
import { useDispatch, useSelector } from 'react-redux';
import ProfileSidebar from './ProfileSidebar';
import { fetchPurchasedCourses } from '../../../store/courseSlice';
import Layout from './Layout';
const MyCoursesPage = () => {
//   const courses = [
//     { id: 1, title: 'Basic of English Language', progress: 30, completed: false },
//     { id: 2, title: 'Introduction the web development', progress: 0, completed: false },
//     { id: 3, title: 'Basic data-structure and algorithm', progress: 100, completed: true },
//     { id: 4, title: 'Lorem ipsum dolor in nulla noslstid', progress: 50, completed: false },
//   ];
  const{user} =useSelector((state)=>state.auth);
  
  const dispatch=useDispatch();
 useEffect(()=>{
    console.log("dispatching this action")
    dispatch(fetchPurchasedCourses());
 },[dispatch]);
 
 const {courses,loading,error}=useSelector((state)=>state.courses)
 if (loading){
    return <div>Loading....</div>
 }
 if (error){
    return <div>{error}</div>
 }
  return (
    <Layout>
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>



      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        <Typography variant="h4" gutterBottom>
          My Courses
        </Typography>
        
        <Paper 
          elevation={3}
          sx={{
            p: 2,
            mb: 4,
            background: 'linear-gradient(to right, #e0f7fa, #b2ebf2, #80deea)',
            borderRadius: 2
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={4}>
              <Box display="flex" alignItems="center">
                <EmojiEvents sx={{ fontSize: 40, mr: 1 }} />
                <Typography variant="h6">3/7 courses</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box display="flex" alignItems="center">
                <CheckCircle sx={{ fontSize: 40, mr: 1 }} />
                <Typography variant="h6">20/70 quizzes</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box display="flex" alignItems="center">
                <PlayArrow sx={{ fontSize: 40, mr: 1 }} />
                <Typography variant="h6">2 hours learning</Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        <Button variant="contained" color="primary" sx={{ mb: 3 }}>
          Course Catalog
        </Button>

         <Grid container spacing={3}>
          {courses.map((course) => (
            <Grid item xs={12} key={course.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {course.name}
                  </Typography> 
                  {/* {course.completed ? (
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography color="success.main" sx={{ display: 'flex', alignItems: 'center' }}>
                        <CheckCircle sx={{ mr: 1 }} /> Completed
                      </Typography>
                      <Button variant="outlined" color="primary">
                        View Certificate
                      </Button>
                    </Box>
                  ) : (
                    <>
                      <LinearProgress variant="determinate" value={course.progress} sx={{ mb: 1 }} />
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="body2">
                          {course.progress === 0 ? 'Not started' : `${course.progress}% complete`}
                        </Typography>
                        <Button variant="contained" color="primary">
                          {course.progress === 0 ? 'Start' : 'Continue'}
                        </Button>
                      </Box>
                    </>
                  )} */}
                 </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid> 
      </Container>
     

    </Box></Layout>
  );
};

export default MyCoursesPage;