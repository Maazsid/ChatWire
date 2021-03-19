import React, { useEffect, useState } from 'react';

import { AppBar, Grid, Tab, Tabs } from '@material-ui/core';
import Communities from './components/communities/Communities';
import PrivateChat from './components/private-chat/PrivateChat';
import AddCommunityModal from './components/communities/AddCommunityModal';
import AddPrivateChatModal from './components/private-chat/AddPrivateChatModal';
import ChatWindow from './components/ChatWindow';
import { useSocket } from '../../contexts/SocketProvider';

const Chat = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { generateSocket } = useSocket();

  useEffect(() => {
    generateSocket();
  }, []);

  return (
    <div className='chat-section'>
      <Grid container spacing={2} style={{ height: '100%' }}>
        <Grid item xs={12} sm={6} md={4} style={{ height: '100%' }}>
          <div className='panel'>
            <AppBar position='static'>
              <Tabs value={value} onChange={handleChange} centered>
                <Tab label='Communties' />
                <Tab label='Private Chat' />
              </Tabs>
            </AppBar>
            {value === 0 ? (
              <Communities />
            ) : value === 1 ? (
              <PrivateChat />
            ) : null}
            <div className='panel__add-btn'>
              {value === 0 ? <AddCommunityModal /> : <AddPrivateChatModal />}
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={8} style={{ height: '100%' }}>
          <ChatWindow selectedWindow={value} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Chat;
