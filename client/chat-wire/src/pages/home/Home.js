import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import Login from './Login';
import SignUp from './SignUp';

const Home = () => {
  const [formLogin, setFormLogin] = useState(true);

  const changeForm = () => {
    setFormLogin(!formLogin);
  };

  return (
    <>
      <div className='home-section'>
        <Grid container spacing={1}>
          <Grid item md={6} xs={12}>
            <div className='hero-section'>
              <h1 className='hero-section__title'>
                Welcome to ChatWire! Chat in your favorite communties today!
              </h1>
            </div>
            {formLogin ? (
              <Login changeForm={changeForm} />
            ) : (
              <SignUp changeForm={changeForm} />
            )}
          </Grid>
          <Grid item md={6} xs={12}>
            <div className='home-section__image-container'>
              <img
                className='home-section__image'
                src='/images/hero-image.svg'
                alt='people chatting'
              />
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Home;
