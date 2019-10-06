import React, { Fragment, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contact/contactContext';

const Navbar = ({ title, icon }) => {
  const { isAuthenticated, user, logoutUser } = useContext(AuthContext);
  const { clearContacts } = useContext(ContactContext);

  const onLogout = e => {
    e.preventDefault();
    logoutUser();
    clearContacts();
  };

  const userLinks = (
    <Fragment>
      {user && <li>Hello, {user.name}</li>}
      <li>
        <a href='#!' onClick={onLogout}>
          <i className='fas fa-sign-out-alt' />{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <NavLink to='/register' activeClassName='active'>
          Register
        </NavLink>
      </li>
      <li>
        <NavLink to='/login' activeClassName='active'>
          Login
        </NavLink>
      </li>
    </Fragment>
  );

  return (
    <nav className='navbar bg-primary'>
      <h1>
        <i className={icon} /> {title}
      </h1>
      <ul>{isAuthenticated ? userLinks : guestLinks}</ul>
    </nav>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
};

Navbar.defaultProps = {
  title: 'Contact Keeper',
  icon: 'fas fa-id-card-alt'
};

export default Navbar;
