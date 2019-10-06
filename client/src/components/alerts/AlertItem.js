import React from 'react';

const AlertItem = ({ alert: { type, msg } }) => (
  <div className={`alert alert-${type}`}>
    <i className='fas fa-info-circle' /> {msg}
  </div>
);

export default AlertItem;
