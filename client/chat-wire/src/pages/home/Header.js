import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  const [isNavOpen, setNavOpen] = useState(false);

  return (
    <div className='header'>
      <input
        className='menu-btn'
        type='checkbox'
        id='menu-btn'
        onChange={() => setNavOpen(!isNavOpen)}
        checked={isNavOpen}
      />
      <span className='header__logo-container'>
        <Link to='/'>
          <img
            className='header__logo-image'
            src='/images/logo.svg'
            alt='Chat Wire'
          />
        </Link>
        <div className='space'></div>
        <label className='menu-icon' htmlFor='menu-btn'>
          <span className='navicon'></span>
        </label>
      </span>
      <div className='header__links'>
        <NavLink
          exact={true}
          activeClassName='header__links--active'
          to='/'
          onClick={() => setNavOpen(false)}
        >
          Home
        </NavLink>
        <NavLink
          activeClassName='header__links--active'
          to='/chat'
          onClick={() => setNavOpen(false)}
        >
          Chat
        </NavLink>
        <NavLink
          activeClassName='header__links--active'
          to='/about'
          onClick={() => setNavOpen(false)}
        >
          About
        </NavLink>
        <NavLink
          activeClassName='header__links--active'
          to='/contact'
          onClick={() => setNavOpen(false)}
        >
          Contact
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
