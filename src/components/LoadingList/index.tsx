import { Grid } from '@material-ui/core';
import { FC } from 'react';
import { Skeleton } from '@material-ui/lab';

const LoadingList: FC = () => {
  const mockCards = Array.from(new Array(5).keys());
  return (
    <>
      {mockCards.map((item) => (
        <Grid key={item} item xs={12}>
          <Skeleton variant="rect" height={100} animation="wave" />
        </Grid>
      ))}
    </>
  );
};

export default LoadingList;
