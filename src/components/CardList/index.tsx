import { Grid, Typography } from '@material-ui/core';
import React, { ReactElement, ReactNode, Suspense } from 'react';
import { RecoilValue, useRecoilValue } from 'recoil';
import LoadingList from '../LoadingList';
import { BaseEntity } from '../../types';

interface CardColumnProps<T extends BaseEntity> {
    recoilSelector: RecoilValue<Array<T>>
    children: (item: T) => ReactNode,
    title: string,
}

function ListContainer<T extends BaseEntity>({
  recoilSelector,
  children,
  title,
}: CardColumnProps<T>): ReactElement | null {
  const list = useRecoilValue(recoilSelector);

  if (list.length === 0) return null;

  return (
    <>
      <Grid xs={12} item>
        <Typography align="center" variant="h5">{title}</Typography>
      </Grid>
      <Grid xs={12} container item spacing={3}>
        {list.map((item) => (
          <Grid key={item.id} item xs={12}>
            { children(item) }
          </Grid>
        ))}
      </Grid>
    </>
  );
}

function CardList<T extends BaseEntity>({
  title,
  recoilSelector,
  children,
}: CardColumnProps<T>): ReactElement {
  return (
    <Grid justify="center" container spacing={2}>
      <Suspense fallback={<LoadingList />}>
        <ListContainer recoilSelector={recoilSelector} title={title}>
          {(item) => children(item)}
        </ListContainer>
      </Suspense>
    </Grid>
  );
}

export default CardList;
