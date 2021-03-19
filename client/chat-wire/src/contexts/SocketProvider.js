import React, { useContext, useState } from 'react';
import io from 'socket.io-client';
import { useAuth } from './AuthProvider';

const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState();
  const { user } = useAuth();

  const generateSocket = () => {
    const newSocket = io('http://localhost:5000', {
      query: user ,
      transports: ['websocket'],
    });
    setSocket(newSocket);
  };

  return (
    <SocketContext.Provider value={{ generateSocket, socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
