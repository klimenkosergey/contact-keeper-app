import React, { useState, useContext, useEffect } from 'react';

import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Register = ({ history }) => {
  const initialState = {
    name: '',
    email: '',
    password: '',
    password2: ''
  };

  const { createAlert, clearAlerts } = useContext(AlertContext);
  const {
    errors,
    isAuthenticated,
    registerUser,
    loadUser,
    clearErrors
  } = useContext(AuthContext);

  const [user, setUser] = useState(initialState);
  const { name, email, password, password2 } = user;

  useEffect(() => {
    if (isAuthenticated) {
      loadUser();
      history.push('/');
    }

    if (errors.length > 0) {
      errors.forEach(error => createAlert(error.msg, 'danger'));
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

    // Remove white spaces from inputs
    const user = {
      name: name.trim(),
      email: email.trim(),
      password: password.trim(),
      password2: password2.trim()
    };

    if (
      user.name === '' ||
      user.email === '' ||
      user.password === '' ||
      user.password2 === ''
    ) {
      createAlert('Please fill all fields', 'danger');
    } else if (user.password.length < 6) {
      createAlert('Password must be at least 6 characters', 'danger');
    } else if (user.password !== user.password2) {
      createAlert('Passwords do not match', 'danger');
    } else {
      registerUser({
        name: user.name,
        email: user.email,
        password: user.password
      });
    }
  };

  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='name'
            value={name}
            onChange={onChange}
            required
          />
        </div>
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
            minLength={6}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password2'>Confirm Password</label>
          <input
            type='password'
            name='password2'
            value={password2}
            onChange={onChange}
            minLength={6}
            required
          />
        </div>
        <button type='submit' className='btn btn-primary btn-block'>
          Create Account
        </button>
      </form>
    </div>
  );
};

export default Register;
