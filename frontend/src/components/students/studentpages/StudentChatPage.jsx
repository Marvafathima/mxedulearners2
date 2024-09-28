// import React, { useState } from 'react';
// import { Box, TextField, Button, List, ListItem, ListItemText, Typography } from '@mui/material';
// import ProfileSidebar from '../studentcomponent/ProfileSidebar';
// import Navbar from '../studentcomponent/Navbar';
// import { useSelector } from 'react-redux';

// const StudentChatPage = () => {
//   const [selectedTutor, setSelectedTutor] = useState(null);
//   const [message, setMessage] = useState('');
//   const [chats, setChats] = useState({});
//   const {user}=useSelector((state)=>state.auth)
//   const tutors = [
//     { id: 1, name: 'Tutor 1' },
//     { id: 2, name: 'Tutor 2' },
//     { id: 3, name: 'Tutor 3' },
//   ];

//   const handleTutorSelect = (tutor) => {
//     setSelectedTutor(tutor);
//   };

//   const handleSendMessage = () => {
//     if (message.trim() && selectedTutor) {
//       setChats((prevChats) => ({
//         ...prevChats,
//         [selectedTutor.id]: [
//           ...(prevChats[selectedTutor.id] || []),
//           { sender: 'student', message },
//         ],
//       }));
//       setMessage('');
//     }
//   };

//   return (
//     <div className="flex h-screen">
//        {/* <ProfileSidebar user={user} /> */}
//       <div className="flex flex-col flex-grow">
//         <Navbar user={user} />
//         <Box className="flex flex-grow">
//           <Box className="w-1/4 border-r">
//             <Typography variant="h6" className="p-4">Tutors</Typography>
//             <List>
//               {tutors.map((tutor) => (
//                 <ListItem
//                   key={tutor.id}
//                   button
//                   onClick={() => handleTutorSelect(tutor)}
//                   selected={selectedTutor && selectedTutor.id === tutor.id}
//                 >
//                   <ListItemText primary={tutor.name} />
//                 </ListItem>
//               ))}
//             </List>
//           </Box>
//           <Box className="flex-grow flex flex-col">
//             {selectedTutor ? (
//               <>
//                 <Typography variant="h6" className="p-4">
//                   Chat with {selectedTutor.name}
//                 </Typography>
//                 <Box className="flex-grow p-4 overflow-auto">
//                   {chats[selectedTutor.id]?.map((chat, index) => (
//                     <div
//                       key={index}
//                       className={`mb-2 ${
//                         chat.sender === 'student' ? 'text-right' : 'text-left'
//                       }`}
//                     >
//                       <span className="inline-block bg-blue-100 rounded px-2 py-1">
//                         {chat.message}
//                       </span>
//                     </div>
//                   ))}
//                 </Box>
//                 <Box className="p-4 flex">
//                   <TextField
//                     fullWidth
//                     variant="outlined"
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                     placeholder="Type a message..."
//                     className="mr-2"
//                   />
//                   <Button variant="contained" onClick={handleSendMessage}>
//                     Send
//                   </Button>
//                 </Box>
//               </>
//             ) : (
//               <Typography variant="h6" className="p-4">
//                 Select a tutor to start chatting
//               </Typography>
//             )}
//           </Box>
//         </Box>
//       </div>
//     </div>
//   );
// };

// export default StudentChatPage;
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, TextField, Button, List, ListItem, ListItemText, Typography } from '@mui/material';
import ProfileSidebar from '../studentcomponent/ProfileSidebar';
import Navbar from '../studentcomponent/Navbar';
import { fetchMyTutors} from '../../../store/tutorChatSlice'
import Layout from '../studentcomponent/Layout';
const StudentChatPage = () => {
  const dispatch = useDispatch();
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState({});
  
  const { user } = useSelector((state) => state.auth);
  

  useEffect(() => {
    dispatch(fetchMyTutors(user.id));
  }, [dispatch, user.id]);
  const { tutors, loading, error } = useSelector((state) => state.chats);
  const handleTutorsSelect = (tutor) => {
    setSelectedTutor(tutor);
  };

  const handleSendMessage = () => {
    if (message.trim() && selectedTutor) {
      setChats((prevChats) => ({
        ...prevChats,
        [selectedTutor.id]: [
          ...(prevChats[selectedTutor.id] || []),
          { sender: 'student', message },
        ],
      }));
      setMessage('');
    }
  };

  if (loading) {
    return <Typography>Loading tutors...</Typography>;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (

  <Layout>
    
        <Box className="flex flex-grow" sx={{ height: '500px',}}>
          <Box className="w-1/4 border-r">
            <Typography variant="h6" className="p-4">Tutors</Typography>
            <List>
              {tutors.map((tutor) => (
                <ListItem
                  key={tutor.id}
                  button
                  onClick={() => handleTutorsSelect(tutor)}
                  selected={selectedTutor && selectedTutor.id === tutor.id}
                >
                  <ListItemText primary={tutor.username} />
                </ListItem>
              ))}
            </List>
          </Box>
          <Box className="flex-grow flex flex-col">
            {selectedTutor ? (
              <>
                <Typography variant="h6" className="p-4">
                  Chat with {selectedTutor.username}
                </Typography>
                <Box className="flex-grow p-4 overflow-auto">
                  {chats[selectedTutor.id]?.map((chat, index) => (
                    <div
                      key={index}
                      className={`mb-2 ${
                        chat.sender === 'student' ? 'text-right' : 'text-left'
                      }`}
                    >
                      <span className="inline-block bg-green-100 rounded px-2 py-1">
                        {chat.message}
                      </span>
                    </div>
                  ))}
                </Box>
                <Box className="p-4 flex">
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="mr-2"
                  />
                  <Button variant="contained" onClick={handleSendMessage}>
                    Send
                  </Button>
                </Box>
              </>
            ) : (
              <Typography variant="h6" className="p-4">
                Select a student to start chatting
              </Typography>
            )}
          </Box>
        </Box>
        </Layout>
      
  );
};

export default StudentChatPage;