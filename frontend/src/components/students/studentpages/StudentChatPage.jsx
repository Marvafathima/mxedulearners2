
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, TextField, Button, List, ListItem, ListItemText, Typography } from '@mui/material';
import Layout from '../studentcomponent/Layout';
import { fetchMyTutors,addMessage,fetchChatHistory,sendMessage } from '../../../store/tutorChatSlice';

const StudentChatPage = () => {
  const dispatch = useDispatch();
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const { tutors,messages, loading, error } = useSelector((state) => state.chats);
  console.log("this is the user detail",user.username,user.id)
  useEffect(() => {
    dispatch(fetchMyTutors(user.id));
  }, [dispatch, user.id]);

  useEffect(() => {
    if (selectedTutor) {
      const roomName = `${user.id}_${selectedTutor.id}`;
      console.log("this is the routing url for websocket:",roomName)
      dispatch(fetchChatHistory(roomName));
      const newSocket = new WebSocket(`ws://localhost:8000/ws/chat/${roomName}/`);
      console.log("this is the routing url for websocket:",newSocket)
      newSocket.onopen = () => {
        console.log('WebSocket connection established');
      };

      newSocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
// Ensure the message object includes the sender information
// const messageWithSender = {
//   ...data,
//   sender: data.sender || selectedTutor.id // Assume it's from the student if sender is not specified
// };
// dispatch(addMessage({ roomName, message: messageWithSender }));

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
  }, [selectedTutor, user.id, dispatch]);

  const handleTutorSelect = (tutor) => {
    setSelectedTutor(tutor);
  };

 
  const handleSendMessage = () => {
    if (message.trim() && selectedTutor) {
      const messageData = {
        message: message,
        sender_id: user.id,
        receiver_id: selectedTutor.id,
        room_name: `${user.id}_${selectedTutor.id}`
      };
      console.log("consoling messgge to check its content",messageData)
     
      // dispatch(sendMessage(messageData));
      if (socket) {
        socket.send(JSON.stringify(messageData));
      }
      setMessage('');
    }
  };
  if (loading) {
    return <Typography>Loading tutors...</Typography>;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }
  const roomName = selectedTutor ? `${user.id}_${selectedTutor.id}` : null;
  const currentChat = roomName ? messages[roomName] || [] : [];


  return (
    <Layout>
      <Box className="flex flex-grow" sx={{ height: '500px' }}>
        <Box className="w-1/4 border-r">
          <Typography variant="h6" className="p-4">Tutors</Typography>
          <List>
            {tutors.map((tutor) => (
              <ListItem
                key={tutor.id}
                button
                onClick={() => handleTutorSelect(tutor)}
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
              {currentChat.map((chat, index) => (
                <div
                  key={index}
                  className={`mb-2 ${
                    chat.sender_id === user.id ? 'text-left' : 'text-right'
                  }`}
                >
                  <span className={`inline-block rounded px-2 py-1 ${
                    chat.sender_id === user.id ? 'bg-blue-100' : 'bg-green-100'
                  }`}>
                    {chat.message}
                  </span>
                </div>
              ))}
            </Box>
              {/* <Box className="flex-grow p-4 overflow-auto">
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
                </Box> */}
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
              Select a tutor to start chatting
            </Typography>
          )}
        </Box>
      </Box>
    </Layout>
  );
};

export default StudentChatPage;