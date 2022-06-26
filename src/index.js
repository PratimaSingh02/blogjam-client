import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ContextProvider } from './context/Context';
import { LoadingContextProvider } from './context/LoadingContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ContextProvider>
    <LoadingContextProvider>
      <App />
    </LoadingContextProvider>
  </ContextProvider>
);
