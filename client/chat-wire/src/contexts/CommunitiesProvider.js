import React, { useContext, useState, useEffect } from 'react';
import { useSocket } from './SocketProvider';

const CommunitiesContext = React.createContext();

export function useCommunities() {
  return useContext(CommunitiesContext);
}

const CommunitiesProvider = ({ children }) => {
  const [communities, setCommunities] = useState();
  const [selectedCommunity, setSelectedCommunity] = useState();

  const { socket } = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on('getCommunities', (data) => {
        setCommunities(data.communities);
      });

      socket.on('communityMessage', (comms) => {
        setCommunities(comms);
      });

      socket.on('newCommunities', (comms) => {
        setCommunities(comms);
      });
    }
  }, [socket, setCommunities]);

  const sendMessageToCommunity = (
    sender,
    message,
    resetMessageInput,
    selectedChat
  ) => {
    socket.emit('sendMessageToCommunity', {
      sender,
      message,
      id: selectedChat._id,
      roomName: selectedChat.roomName,
    });
    resetMessageInput('');
  };

  const addCommunity = (e, name, setValue, modalClose) => {
    const isEnterKey = e.type === 'keydown' && e.keyCode === 13;
    const isClick = e.type === 'click';

    if (isEnterKey || isClick) {
      e.preventDefault();
      socket.emit('addCommunity', { name });
      setValue('');
      modalClose();
    }
  };

  return (
    <CommunitiesContext.Provider
      value={{
        communities,
        addCommunity,
        sendMessageToCommunity,
        setSelectedCommunity,
        selectedCommunity,
      }}
    >
      {children}
    </CommunitiesContext.Provider>
  );
};

export default CommunitiesProvider;
