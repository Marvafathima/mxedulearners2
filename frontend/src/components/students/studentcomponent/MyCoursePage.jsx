import React, { useEffect } from 'react';
import { Box, Typography, Button, Card, CardContent, LinearProgress, Grid, Container, Paper } from '@mui/material';
import { CheckCircle, PlayArrow, EmojiEvents } from '@mui/icons-material';
import Navbar from './Navbar'; // Assuming you have this component
import Footer from './Footer'; // Assuming you have this component
import { useDispatch, useSelector } from 'react-redux';
import ProfileSidebar from './ProfileSidebar';
import { fetchPurchasedCourses,fetchCourseDetail } from '../../../store/courseSlice';
import Layout from './Layout';
import { useNavigate } from 'react-router-dom';
const MyCoursesPage = () => {

  const{user} =useSelector((state)=>state.auth);
  const navigate=useNavigate();
  const dispatch=useDispatch();
 useEffect(()=>{
    console.log("dispatching this action")
    dispatch(fetchPurchasedCourses());
 },[dispatch]);
 
 const {courses,loading,error}=useSelector((state)=>state.courses)
 const handleViewDetails = (id) => {
  dispatch(fetchCourseDetail(id));
  navigate(`/mycourse/${id}`);
};
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
            {courses.map((item) => (
              <Grid item xs={12} key={item.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {item.course.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      Creator: {item.course.user ? item.course.user.username : 'Unknown'}
                    </Typography>
                    {item.iscomplete ? (
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography color="success.main" sx={{ display: 'flex', alignItems: 'center' }}>
                          <CheckCircle sx={{ mr: 1 }} /> Completed
                        </Typography>
                        <Button variant="outlined" color="primary">
                          View Certificate
                        </Button>
                      </Box>
                    ) : (
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="body2">
                          {item.isstart ? 'In Progress' : 'Not Started'}
                        </Typography>
                        <Button 
                          variant="contained" 
                          color="primary"
                          onClick={() => handleViewDetails(item.course.id)}
                        >
                          {item.isstart ? 'Continue' : 'Start'}
                        </Button>
                      </Box>
                    )}
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