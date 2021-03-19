import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AppBar, TextareaAutosize } from '@material-ui/core';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import { useCommunities } from '../../../contexts/CommunitiesProvider';
import { useUser } from '../../../contexts/UserProvider';
import { useAuth } from '../../../contexts/AuthProvider';

const ChatWindow = ({ selectedWindow }) => {
  const { user } = useAuth();
  const { selectedCommunity, sendMessageToCommunity } = useCommunities();
  const { selectedUser, sendMessageToFriend } = useUser();

  const [selectedChat, setSelectedChat] = useState();
  const [messageValue, setMessageValue] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const [c,setC] = useState(false);

  const setRef = useCallback((node) => {
    if (node) node.scrollIntoView({ smooth: true });
  }, []);

  useEffect(() => {
    if (selectedWindow === 0) {
      setSelectedChat(selectedCommunity);
    } else {
      setSelectedChat(selectedUser);
    }
  }, [selectedWindow, selectedCommunity, selectedUser]);

  useEffect(() => {
    if (messageValue.length < 2) {
      if (/\n/.test(messageValue)) setMessageValue('');
    }
  }, [messageValue]);

  const handleMessageSubmit = (e) => {
    const isEnterKey = e.type === 'keydown' && e.keyCode === 13;
    const isClick = e.type === 'click';

    if (isEnterKey || isClick) {
      if (messageValue.trim() !== '') {
        if (selectedWindow === 0) {
          sendMessageToCommunity(
            user.name,
            messageValue,
            setMessageValue,
            selectedChat
          );
        } else {
          sendMessageToFriend(
            user.name,
            messageValue,
            setMessageValue,
            selectedChat
          );
        }
      }
    }
  };

  const selectEmoji = (e) => {
    const sym = e.unified.split('-');
    const codesArray = [];
    sym.forEach((el) => codesArray.push('0x' + el));
    const emoji = String.fromCodePoint(...codesArray);
    setMessageValue((prevValue) => prevValue + emoji);
  };

  const showEmojiPanel = () => {
    setShowEmoji(() => {
      document.addEventListener('click', closeEmojiPanel);
      return true;
    });
  };

  const closeEmojiPanel = (e) => {
    let isEmojiPanel = false;
    e.path.forEach((elem) => {
      if (elem && elem.classList) {
        const data = elem.classList.value;
        if (data.includes('emoji')) isEmojiPanel = true;
      }
    });

    if (isEmojiPanel === false && e.target.id !== 'emoji-btn') {
      setShowEmoji(false);
      document.removeEventListener('click', closeEmojiPanel);
    }
  };

  return (
    <div className='chat-window'>
      <AppBar position='static'>
        <span className='chat-window__name'>
          {selectedChat && selectedChat.name}
        </span>
      </AppBar>
      <div className='chat-window__messages-container'>
        {user &&
          selectedChat &&
          selectedChat.messages.map((message, index) => {
            const sameUser = message.sender === user.name;
            const lastMessage = selectedChat.messages.length - 1 === index;
            return (
              <div
                ref={lastMessage ? setRef : null}
                style={{
                  alignSelf: sameUser ? 'flex-end' : 'flex-start',
                  backgroundColor: sameUser ? '#e03870' : '#262626',
                }}
                className='chat-window__message'
                key={message._id}
              >
                <div className='chat-window__message-name'>
                  {sameUser ? `You` : `${message.sender}`}
                </div>
                {message.message}
                <div className='chat-window__message-time'>{message.time}</div>

                <span className='chat-window__message-info'></span>
              </div>
            );
          })}
      </div>

      <div className='chat-window__send-message-container'>
        {showEmoji ? (
          <div className='chat-window__emoji-container'>
            <Picker title='Chat Wire' onSelect={selectEmoji} />
          </div>
        ) : null}

        <div>
          <img
            className='chat-window__smile-icon'
            id='emoji-btn'
            src='/icons/smile.svg'
            alt='choose emojis'
            onClick={showEmojiPanel}
          />
        </div>

        <div className = 'chat-window__file-container' onClick = {() => setC((p) => !p)}>   
          <img
            className='chat-window__smile-icon'
            src='/icons/clip.svg'
            alt='video and file'
          />
          <input className = 'chat-window__ok' type="radio" name="" id="radio-btn" checked = {true}/>
          <label  className = 'chat-window__label' htmlFor = 'radio-btn'>
          </label>

          <div className="chat-window__file-options">

          </div>
        </div>

        <TextareaAutosize
          className='chat-window__send-message-area'
          rowsMax={4}
          placeholder='Enter message'
          value={messageValue}
          onChange={(e) => setMessageValue(e.target.value)}
          onKeyDown={handleMessageSubmit}
          type='button'
        />

        <button
          onClick={handleMessageSubmit}
          type='submit'
          style={{ outline: 'none', border: 'none', padding: '0' }}
        >
          <img
            className='chat-window__send-icon'
            src='/icons/send2.svg'
            alt='send message'
          />
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
