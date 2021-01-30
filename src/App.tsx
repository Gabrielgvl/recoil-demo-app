import React from 'react';
import {
  Container, Divider, Grid, Typography,
} from '@material-ui/core';
import './App.css';
import UserColumn from './components/UserColumn';
import ChainColumn from './components/ChainColumn';
import Column from './components/Column';
import { hasCurrentUser } from './recoil/users';
import StoreColumn from './components/StoreColumn';
import { hasCurrentChain } from './recoil/chains';
import ProductColumn from './components/ProductColumn';
import { hasCurrentStore } from './recoil/stores';

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
          <Column shouldRenderSelector={hasCurrentUser}>
            <ChainColumn />
          </Column>
        </Grid>
        <Grid item xs={3}>
          <Column shouldRenderSelector={hasCurrentChain}>
            <StoreColumn />
          </Column>
        </Grid>
        <Grid item xs={3}>
          <Column shouldRenderSelector={hasCurrentStore}>
            <ProductColumn />
          </Column>
        </Grid>
      </Grid>
    </Grid>
  </Container>
);

export default App;
