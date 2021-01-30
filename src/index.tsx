import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import { StylesProvider } from '@material-ui/core';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <StylesProvider injectFirst>
        <App />
      </StylesProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root'),
);
