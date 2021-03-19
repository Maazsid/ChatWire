import React, { useState } from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import axios from 'axios';
import { useUser } from '../../contexts/UserProvider';
import { useHistory } from 'react-router';
import { useAuth } from '../../contexts/AuthProvider';

const Login = ({ changeForm }) => {
  const history = useHistory();

  // const { setUser } = useUser();

  const { setUser} = useAuth();

  const [name, setName] = useState('');
  const [{ isLoading, error }, setStatus] = useState({
    isLoading: false,
    error: false,
  });

  const nameHandle = (e) => {
    setName(e.target.value);
  };

  const submitName = (e) => {
    const username = { name };
    const isEnterKey = e.type === 'keydown' && e.keyCode === 13;
    const isClick = e.type === 'click';

    if (isEnterKey || isClick) {
      setStatus({ error: false, isLoading: true });
      axios
        .post('http://localhost:5000/login', username)
        .then((res) => {
          setStatus({ error: false, isLoading: false });
          setUser(res.data.user);
          history.push('/chat');
          setName('');
        })
        .catch((error) => {
          console.log(error);

          setStatus((prevValue) => ({
            ...prevValue,
            error: true,
            isLoading: false,
          }));
          setName('');
        });
    }
  };

  return (
    <div className='hero-section-card'>
      <div className='hero-section-card__container'>
        <h2 className='hero-section-card__title'>Sign In</h2>
        <input
          className='hero-section-card__input'
          type='text'
          placeholder='Enter your name'
          value={name}
          onChange={nameHandle}
          onKeyDown={submitName}
        />

        {error ? (
          <p className='error-message'>Username does not exist.</p>
        ) : null}
        <Button type='submit' onClick={submitName}>
          {isLoading ? <CircularProgress /> : 'Enter'}
        </Button>
        <p className='hero-section-card__sign-in'>
          Don't have an account?
          <span onClick={() => changeForm()}> Sign Up</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
