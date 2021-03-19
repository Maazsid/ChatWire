import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthProvider';
import { useSocket } from './SocketProvider';

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

const UserProvider = ({ children }) => {
  const { socket } = useSocket();

  const [searchedUsers, setSearchedUsers] = useState();
  const [selectedUser, setSelectedUser] = useState();

  const { user, setUser } = useAuth();

  useEffect(() => {
    if (socket) {
      socket.on('returnedUsers', ({ users }) => {
        setSearchedUsers(users);
      });

      socket.on('newFriend', ({ user }) => {
        setUser(user);
      });

      socket.on('newUserData', ({ userData, friendData }) => {
        if (userData.name === user.name) {
          setUser(userData);
        } else {
          setUser(friendData);
        }
      });
    }
  }, [socket, setSearchedUsers]);

  const sendMessageToFriend = (
    sender,
    message,
    resetMessageInput,
    selectedChat
  ) => {
    socket.emit('sendMessageToFriend', {
      sender,
      message,
      id: selectedChat._id,
      roomName: selectedChat.roomName,
    });
    resetMessageInput('');
  };

  const searchUser = (queryValue) => {
    setSearchedUsers();
    socket.emit('searchUser', { queryValue });
  };

  const addFriend = (e, friend, setValue, modalClose) => {
    const isEnterKey = e.type === 'keydown' && e.keyCode === 13;
    const isClick = e.type === 'click';
    if (isEnterKey || isClick) {
      e.preventDefault();
      socket.emit('addFriend', { user, friend });
      setValue('');
      modalClose();
    }
  };

  return (
    <UserContext.Provider
      value={{
        searchUser,
        searchedUsers,
        setSearchedUsers,
        addFriend,
        selectedUser,
        setSelectedUser,
        sendMessageToFriend,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
