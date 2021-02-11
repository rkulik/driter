import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import SnackbarContextProvider from './contexts/snackbar';
import './i18n';
import './style.css';

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback="loading">
      <SnackbarContextProvider>
        <App />
      </SnackbarContextProvider>
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root'),
);
