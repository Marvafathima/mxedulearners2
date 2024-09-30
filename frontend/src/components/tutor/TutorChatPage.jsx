
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, TextField, Button, List, ListItem, ListItemText, Typography } from '@mui/material';
import TutorSidebar from './TutorSidebar';
import TutorNavbar from './TutorNavbar';
import { fetchMyStudents,addMessage,fetchChatHistory,sendMessage } from '../../store/tutorChatSlice';

const TutorChatPage = () => {
  const dispatch = useDispatch();
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState(null);
  
  const { user } = useSelector((state) => state.auth);
  const { students, messages, loading, error } = useSelector((state) => state.chats);
  console.log("this is the user detail",user.username,user.id)
  useEffect(() => {
    dispatch(fetchMyStudents(user.id));
  }, [dispatch, user.id]);

  useEffect(() => {
    if (selectedStudent) {
      const roomName = `${selectedStudent.id}_${user.id}`;
      dispatch(fetchChatHistory(roomName));

      const newSocket = new WebSocket(`ws://localhost:8000/ws/chat/${roomName}/`);
      
      newSocket.onopen = () => {
        console.log('WebSocket connection established');
      };

      newSocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        dispatch(addMessage({ roomName, message: data }));
      };

      newSocket.onclose = () => {
        console.log('WebSocket connection closed');
      };

      setSocket(newSocket);

      return () => {
        newSocket.close();
      };
    }
  }, [selectedStudent, user.id, dispatch]);

  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
  };

  const handleSendMessage = () => {
    if (message.trim() && selectedStudent) {
      const messageData = {
        message: message,
        sender: user.id,
        receiver: selectedStudent.id,
        room_name: `${selectedStudent.id}_${user.id}`
      };
      dispatch(sendMessage(messageData));
      if (socket) {
        socket.send(JSON.stringify(messageData));
      }
      setMessage('');
    }
  };

  if (loading) {
    return <Typography>Loading students...</Typography>;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  const roomName = selectedStudent ? `${selectedStudent.id}_${user.id}` : null;
  const currentChat = roomName ? messages[roomName] || [] : [];

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
                  {currentChat.map((chat, index) => (
                    <div
                      key={index}
                      className={`mb-2 ${
                        chat.sender === user.id ? 'text-left' : 'text-right'
                      }`}
                    >
                      <span className={`inline-block rounded px-2 py-1 ${
                        chat.sender === user.id ? 'bg-blue-100' : 'bg-green-100'
                      }`}>
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