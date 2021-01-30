import { Grid, Typography } from '@material-ui/core';
import React, { ReactElement, ReactNode, Suspense } from 'react';
import { RecoilValue, useRecoilValue } from 'recoil';

interface ListContainerProps<T extends {id: number}> {
    recoilSelector: RecoilValue<Array<T>>
    children: (item: T) => ReactNode,
}

function ListContainer<T extends {id: number}>({
  recoilSelector,
  children,
}: ListContainerProps<T>): ReactElement {
  const list = useRecoilValue(recoilSelector);
  return (
    <>
      {list.map((item) => (
        <Grid key={item.id} item xs={12}>
          { children(item) }
        </Grid>
      ))}
    </>
  );
}

export interface CardColumnProps<T extends {id: number}> extends ListContainerProps<T>{
    title: string,
}

function CardColumn<T extends {id: number}>({
  title,
  recoilSelector,
  children,
}: CardColumnProps<T>): ReactElement {
  return (
    <Grid justify="center" container spacing={2}>
      <Grid xs={12} item>
        <Typography align="center" variant="h5">{title}</Typography>
      </Grid>
      <Grid xs={12} container item spacing={3}>
        <Suspense fallback="loading">
          <ListContainer recoilSelector={recoilSelector}>
            {(item) => children(item)}
          </ListContainer>
        </Suspense>
      </Grid>
    </Grid>
  );
}

export default CardColumn;
