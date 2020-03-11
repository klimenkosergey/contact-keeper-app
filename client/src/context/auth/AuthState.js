import React, { useReducer } from 'react';
import axios from 'axios';

import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    user: null,
    errors: []
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User
  const loadUser = async () => {
    setAuthToken(state.token);
    console.log(`token is ${state.token}`);
    try {
      const res = await axios.get('/api/auth');

      dispatch({ type: 'USER_LOADED', payload: res.data });
    } catch (error) {
      dispatch({ type: 'AUTH_FAILED' });
    }
  };

  // Register User
  const registerUser = async user => {
    // Create Axios config object
    const config = {
      headers: { 'Content-Type': 'application/json' }
    };

    try {
      const res = await axios.post('/api/users', user, config);
      dispatch({ type: 'REGISTER_SUCCESS', payload: res.data });
    } catch (error) {
      dispatch({ type: 'REGISTER_FAILURE', payload: error.response.data });
    }
  };

  // Login User
  const loginUser = async user => {
    const config = {
      headers: { 'Content-Type': 'application/json' }
    };

    try {
      const res = await axios.post('/api/auth', user, config);
      setAuthToken(res.data.token);
      console.log(`token is ${res.data.token}`);
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
    } catch (error) {
      console.log(error.response.data);
      dispatch({ type: 'LOGIN_FAILURE', payload: error.response.data });
    }
  };

  // Logout User
  const logoutUser = () => {
    dispatch({ type: 'LOGOUT' });
  };

  // Clear Errors
  const clearErrors = () => {
    dispatch({ type: 'CLEAR_ERRORS' });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        errors: state.errors,
        registerUser,
        loginUser,
        logoutUser,
        loadUser,
        clearErrors
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
