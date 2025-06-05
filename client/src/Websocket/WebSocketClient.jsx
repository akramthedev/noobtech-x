import { useEffect, useRef } from 'react';
import  { ENVIRONMENT } from "../environments" 


const WebSocketClient = ({ userId, establishmentId, functionRefresh}) => {
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = new WebSocket(`ws://${ENVIRONMENT.BACKEND_URL}`);

    socketRef.current = socket;

    socket.onopen = () => {
      console.log('WebSocket connected');

      socket.send(JSON.stringify({
        action: 'register',
        payload: { userId, establishmentId }
      }));
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log('Message reçu du serveur:', message);

      if (message.action === 'hello_world') {
        console.log("Message du backend:", message.payload);
      }
      else if (message.action === 'establishment_updated') { 
        functionRefresh();
      }
    };

    socket.onerror = (err) => {
      console.error('WebSocket error:', err);
    };

    socket.onclose = () => {
      console.log('WebSocket disconnected');
    };

    return () => {
      socket.close();
    };
  }, [userId]);

  return null;  
};

export default WebSocketClient;
