import React, { useState, useEffect, useContext } from 'react';

import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const Login = ({ history }) => {
  const initialState = {
    email: '',
    password: ''
  };

  const [user, setUser] = useState(initialState);
  const { email, password } = user;

  const { createAlert, clearAlerts } = useContext(AlertContext);
  const {
    errors,
    isAuthenticated,
    loadUser,
    loginUser,
    clearErrors
  } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      loadUser();
      history.push('/');
    }

    if (errors.length > 0) {
      errors.forEach(error => createAlert(error, 'danger'));
    }
    // eslint-disable-next-line
  }, [errors, isAuthenticated]);

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    clearErrors();
    clearAlerts();
    if (email === '' || password === '') {
      createAlert('Please fill in all fields', 'danger');
    } else {
      loginUser({ email, password });
    }
  };

  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <button type='submit' className='btn btn-primary btn-block'>
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
