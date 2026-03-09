import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';  // ← Changé de .css à .scss
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
