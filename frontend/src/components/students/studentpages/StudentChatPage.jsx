
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, TextField, Button, List, ListItem, ListItemText, Typography } from '@mui/material';
import Layout from '../studentcomponent/Layout';
import { fetchMyTutors } from '../../../store/tutorChatSlice';

const StudentChatPage = () => {
  const dispatch = useDispatch();
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState({});
  const [socket, setSocket] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const { tutors, loading, error } = useSelector((state) => state.chats);

  useEffect(() => {
    dispatch(fetchMyTutors(user.id));
  }, [dispatch, user.id]);

  useEffect(() => {
    if (selectedTutor) {
      const roomName = `${user.id}_${selectedTutor.id}`;
      console.log("this is the routing url for websocket:",roomName)
      const newSocket = new WebSocket(`ws://localhost:8000/ws/chat/${roomName}/`);
      console.log("this is the routing url for websocket:",newSocket)
      newSocket.onopen = () => {
        console.log('WebSocket connection established');
      };

      // newSocket.onmessage = (event) => {
      //   const data = JSON.parse(event.data);
      //   setChats((prevChats) => ({
      //     ...prevChats,
      //     [selectedTutor.id]: [
      //       ...(prevChats[selectedTutor.id] || []),
      //       { sender: data.sender_id === user.id ? 'student' : 'tutor', message: data.message },
      //     ],
      //   }));
      // };
      newSocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setChats((prevChats) => ({
          ...prevChats,
          [data.sender_id === user.id ? data.receiver_id : data.sender_id]: [
            ...(prevChats[data.sender_id === user.id ? data.receiver_id : data.sender_id] || []),
            { 
              sender: data.sender_id === user.id ? 'self' : 'other', 
              message: data.message,
              sender_id: data.sender_id,
              receiver_id: data.receiver_id
            },
          ],
        }));
      };
      newSocket.onclose = () => {
        console.log('WebSocket connection closed');
      };

      setSocket(newSocket);

      return () => {
        newSocket.close();
      };
    }
  }, [selectedTutor, user.id]);

  const handleTutorSelect = (tutor) => {
    setSelectedTutor(tutor);
  };

  const handleSendMessage = () => {
    if (message.trim() && selectedTutor && socket) {
      socket.send(JSON.stringify({
        message: message,
        sender_id: user.id,
        receiver_id: selectedTutor.id 
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
              Select a tutor to start chatting
            </Typography>
          )}
        </Box>
      </Box>
    </Layout>
  );
};

export default StudentChatPage;