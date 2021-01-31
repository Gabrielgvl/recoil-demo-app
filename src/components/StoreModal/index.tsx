import { FC } from 'react';
import { TextField } from '@material-ui/core';
import { Store } from '../../types';
import CustomModal from '../CustomModal';

export interface StoreModalProps {
    store: Store,
    open: boolean,
    onClose: () => void,
    handleSubmit: (values: Store) => void
}

const StoreModal: FC<StoreModalProps> = ({
  open, onClose, store, handleSubmit,
}) => (
  <CustomModal
    initialValues={store}
    onClose={onClose}
    onSubmit={handleSubmit}
    open={open}
    title={store.name}
  >
    {({ handleChange, values }) => (
      <>
        <TextField
          fullWidth
          label="Nome"
          value={values.name}
          name="name"
          variant="outlined"
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Cargo"
          value={values.city}
          name="city"
          variant="outlined"
          onChange={handleChange}
          margin="normal"
        />
      </>
    )}
  </CustomModal>
);

export default StoreModal;
