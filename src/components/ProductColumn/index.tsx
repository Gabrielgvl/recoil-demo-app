import React, { FunctionComponent } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Typography } from '@material-ui/core';
import CardList from '../CardList';
import CustomCard from '../CustomCard';
import { currentStoreId, currentStoreState, storesState } from '../../recoil/stores';

const StoreColumn: FunctionComponent = () => {
  const storeId = useRecoilValue(currentStoreId);
  const setStore = useSetRecoilState(currentStoreState);
  return (
    <CardList title="Lojas" recoilSelector={storesState}>
      {(store) => (
        <CustomCard selected={storeId === store.id} onClick={() => setStore(store)}>
          <Typography variant="h6">{`${store.name}`}</Typography>
          <Typography>{store.city}</Typography>
        </CustomCard>
      )}
    </CardList>
  );
};

export default React.memo(StoreColumn);
