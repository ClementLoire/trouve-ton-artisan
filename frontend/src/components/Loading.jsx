import React from 'react';
import './Loading.scss';

const Loading = ({ message = "Chargement..." }) => {
  return (
    <div className="loading">
      <div className="loading-spinner"></div>
      <p className="loading-message">{message}</p>
    </div>
  );
};

export default Loading;