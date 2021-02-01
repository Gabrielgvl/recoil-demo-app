import { Grid, Typography } from '@material-ui/core';
import React, { ReactElement, ReactNode, Suspense } from 'react';
import { RecoilValue, useRecoilValue } from 'recoil';
import LoadingList from '../LoadingList';
import { BaseEntity } from '../../types';

interface ListContainerProps<T extends BaseEntity> {
    recoilSelector: RecoilValue<Array<T>>
    children: (item: T) => ReactNode,
}

function ListContainer<T extends BaseEntity>({
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

export interface CardColumnProps<T extends BaseEntity> extends ListContainerProps<T>{
    title: string,
}

function CardList<T extends BaseEntity>({
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
        <Suspense fallback={<LoadingList />}>
          <ListContainer recoilSelector={recoilSelector}>
            {(item) => children(item)}
          </ListContainer>
        </Suspense>
      </Grid>
    </Grid>
  );
}

export default CardList;
