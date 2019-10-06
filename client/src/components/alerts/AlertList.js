import React, { useContext } from 'react';

import AlertContext from '../../context/alert/alertContext';
import AlertItem from './AlertItem';

const AlertList = () => {
  const { alerts } = useContext(AlertContext);

  return (
    <div className='alert-container'>
      {alerts.map(alert => (
        <AlertItem key={alert.id} alert={alert} />
      ))}
    </div>
  );
};

export default AlertList;
