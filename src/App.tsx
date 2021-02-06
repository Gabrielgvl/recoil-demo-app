import React from 'react';
import {
  Container, Divider, Grid, Typography,
} from '@material-ui/core';
import './App.css';
import UserColumn from './components/UserColumn';
import ChainColumn from './components/ChainColumn';
import StoreColumn from './components/StoreColumn';
import ProductColumn from './components/ProductColumn';

const App: React.FC = () => (
  <Container maxWidth="xl">
    <Grid justify="center" container spacing={3}>
      <Grid xs={12} item>
        <Typography align="center" variant="h2">Recoil Demo</Typography>
        <Divider />
      </Grid>
      <Grid item container justify="space-evenly" spacing={6}>
        <Grid item xs={3}>
          <UserColumn />
        </Grid>
        <Grid item xs={3}>
          <ChainColumn />
        </Grid>
        <Grid item xs={3}>
          <StoreColumn />
        </Grid>
        <Grid item xs={3}>
          <ProductColumn />
        </Grid>
      </Grid>
    </Grid>
  </Container>
);

export default App;
