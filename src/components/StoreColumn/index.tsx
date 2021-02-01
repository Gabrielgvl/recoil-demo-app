import { FunctionComponent, memo } from 'react';
import { useSetRecoilState } from 'recoil';
import { Typography } from '@material-ui/core';
import CardList from '../CardList';
import CustomCard from '../CustomCard';
import { currentStoreState, storesState } from '../../recoil/stores';
import useModalHelper from '../../hooks/useModalHelper';
import StoreModal from '../StoreModal';

const StoreColumn: FunctionComponent = () => {
  const setStore = useSetRecoilState(currentStoreState);
  const {
    value: editStore, isModalOpen, handleOpen, handleClose, handleEdit,
  } = useModalHelper(storesState);
  return (
    <>
      <CardList title="Lojas" recoilSelector={storesState}>
        {(store) => (
          <CustomCard
            selected={store.selected}
            onClick={() => setStore(store)}
            onEdit={() => handleOpen(store)}
          >
            <Typography variant="h6">{`${store.name}`}</Typography>
            <Typography>{store.city}</Typography>
          </CustomCard>
        )}
      </CardList>
      {editStore && (
      <StoreModal
        store={editStore}
        open={isModalOpen}
        onClose={handleClose}
        handleSubmit={handleEdit}
      />
      )}
    </>
  );
};

export default memo(StoreColumn);
