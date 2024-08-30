import React from 'react';
import ReactDOM from 'react-dom';
import Master from './pages/Main'
import './firebase';

ReactDOM.render(
  <React.StrictMode>
    <Master/>
  </React.StrictMode>,
  document.getElementById('root')
);