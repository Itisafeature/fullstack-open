import React from 'react';

const Notification = ({ message, isError }) => {
  if (message)
    return <div className={isError ? 'error' : 'notification'}>{message}</div>;
  return null;
};

export default Notification;
