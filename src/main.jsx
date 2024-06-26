import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/index.scss';
import { ThemeProvider } from 'styled-components';
import { theme } from './utils/constants.js';
import { GlobalStyle } from './styles/GlobalStyles.js';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle></GlobalStyle>
      <Router>
        <App />
        <ToastContainer position="top-right" theme="colored" autoClose={3000} />
      </Router>
    </ThemeProvider>
  </React.StrictMode>
);
