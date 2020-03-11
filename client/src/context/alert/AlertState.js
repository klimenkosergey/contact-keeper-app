import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

import AlertContext from './alertContext';
import alertReducer from './alertReducer';

const AlertState = props => {
  const initialState = [];

  const [state, dispatch] = useReducer(alertReducer, initialState);

  // Create Alert
  const createAlert = (msg, type) => {
    const id = uuidv4();
    dispatch({ type: 'CREATE_ALERT', payload: { id, msg, type } });
  };

  // Remove Alert
  const removeAlert = id => {
    dispatch({ type: 'REMOVE_ALERT', payload: id });
  };

  // Clear Alerts
  const clearAlerts = () => {
    dispatch({ type: 'CLEAR_ALERTS' });
  };

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        createAlert,
        removeAlert,
        clearAlerts
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
