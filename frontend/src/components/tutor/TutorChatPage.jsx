// import React, { useEffect, useState } from 'react';
// import { Box, TextField, Button, List, ListItem, ListItemText, Typography } from '@mui/material';
// import TutorSidebar from './TutorSidebar';
// import TutorNavbar from './TutorNavbar';
// import { useSelect } from '@material-tailwind/react';
// import { useSelector } from 'react-redux';

// const TutorChatPage = () => {
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [message, setMessage] = useState('');
//   const [chats, setChats] = useState({});
//   const {user}=useSelector((state)=>state.auth)
//   const students = [
//     { id: 1, name: 'Student 1' },
//     { id: 2, name: 'Student 2' },
//     { id: 3, name: 'Student 3' },
//   ];
  
//   const handleStudentSelect = (student) => {
//     setSelectedStudent(student);
//   };

//   const handleSendMessage = () => {
//     if (message.trim() && selectedStudent) {
//       setChats((prevChats) => ({
//         ...prevChats,
//         [selectedStudent.id]: [
//           ...(prevChats[selectedStudent.id] || []),
//           { sender: 'tutor', message },
//         ],
//       }));
//       setMessage('');
//     }
//   };

//   return (
//     <div className="flex h-screen">
//       <TutorSidebar user={user}/>
//       <div className="flex flex-col flex-grow">
//         <TutorNavbar  user={user}/>
//         <Box className="flex flex-grow">
//           <Box className="w-1/4 border-r">
//             <Typography variant="h6" className="p-4">Students</Typography>
//             <List>
//               {students.map((student) => (
//                 <ListItem
//                   key={student.id}
//                   button
//                   onClick={() => handleStudentSelect(student)}
//                   selected={selectedStudent && selectedStudent.id === student.id}
//                 >
//                   <ListItemText primary={student.name} />
//                 </ListItem>
//               ))}
//             </List>
//           </Box>
//           <Box className="flex-grow flex flex-col">
//             {selectedStudent ? (
//               <>
//                 <Typography variant="h6" className="p-4">
//                   Chat with {selectedStudent.name}
//                 </Typography>
//                 <Box className="flex-grow p-4 overflow-auto">
//                   {chats[selectedStudent.id]?.map((chat, index) => (
//                     <div
//                       key={index}
//                       className={`mb-2 ${
//                         chat.sender === 'tutor' ? 'text-right' : 'text-left'
//                       }`}
//                     >
//                       <span className="inline-block bg-green-100 rounded px-2 py-1">
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
//                 Select a student to start chatting
//               </Typography>
//             )}
//           </Box>
//         </Box>
//       </div>
//     </div>
//   );
// };

// export default TutorChatPage;
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, TextField, Button, List, ListItem, ListItemText, Typography } from '@mui/material';
import TutorSidebar from './TutorSidebar';
import TutorNavbar from './TutorNavbar';
import { fetchMyStudents } from '../../store/tutorChatSlice'

const TutorChatPage = () => {
  const dispatch = useDispatch();
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState({});
  
  const { user } = useSelector((state) => state.auth);
  

  useEffect(() => {
    dispatch(fetchMyStudents(user.id));
  }, [dispatch, user.id]);
  const { students, loading, error } = useSelector((state) => state.chats);
  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
  };

  const handleSendMessage = () => {
    if (message.trim() && selectedStudent) {
      setChats((prevChats) => ({
        ...prevChats,
        [selectedStudent.id]: [
          ...(prevChats[selectedStudent.id] || []),
          { sender: 'tutor', message },
        ],
      }));
      setMessage('');
    }
  };

  if (loading) {
    return <Typography>Loading students...</Typography>;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <div className="flex h-screen">
      <TutorSidebar user={user} />
      <div className="flex flex-col flex-grow">
        <TutorNavbar user={user} />
        <Box className="flex flex-grow">
          <Box className="w-1/4 border-r">
            <Typography variant="h6" className="p-4">Students</Typography>
            <List>
              {students.map((student) => (
                <ListItem
                  key={student.id}
                  button
                  onClick={() => handleStudentSelect(student)}
                  selected={selectedStudent && selectedStudent.id === student.id}
                >
                  <ListItemText primary={student.username} />
                </ListItem>
              ))}
            </List>
          </Box>
          <Box className="flex-grow flex flex-col">
            {selectedStudent ? (
              <>
                <Typography variant="h6" className="p-4">
                  Chat with {selectedStudent.username}
                </Typography>
                <Box className="flex-grow p-4 overflow-auto">
                  {chats[selectedStudent.id]?.map((chat, index) => (
                    <div
                      key={index}
                      className={`mb-2 ${
                        chat.sender === 'tutor' ? 'text-right' : 'text-left'
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
      </div>
    </div>
  );
};

export default TutorChatPage;