import { Grid, Typography } from '@material-ui/core';
import React, { FC } from 'react';
import { Skeleton } from '@material-ui/lab';

const LoadingList: FC = () => {
  const mockCards = Array.from(new Array(5).keys());
  return (
    <>
      <Grid xs={12} item justify="center" container>
        <Skeleton
          variant="text"
          width="40%"
          height={50}
          animation="wave"
        />
      </Grid>
      {mockCards.map((item) => (
        <Grid key={item} item xs={12}>
          <Skeleton variant="rect" height={100} animation="wave" />
        </Grid>
      ))}
    </>
  );
};

export default LoadingList;
