import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import '../src/assets/index.css'

import App from './components/App';

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('app')
);
