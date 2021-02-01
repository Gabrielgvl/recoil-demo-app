import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import { StylesProvider, Typography } from '@material-ui/core';
import { ErrorBoundary } from 'react-error-boundary';
import App from './App';

ReactDOM.render(
  <RecoilRoot>
    <ErrorBoundary fallback={<Typography align="center" variant="h3">Aconteceu um erro! Lembre-se de rodar yarn start:db antes!</Typography>}>
      <StylesProvider injectFirst>
        <App />
      </StylesProvider>
    </ErrorBoundary>
  </RecoilRoot>,
  document.getElementById('root'),
);
