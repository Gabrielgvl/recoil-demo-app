import { FC } from 'react';
import { TextField } from '@material-ui/core';
import { Chain } from '../../types';
import CustomModal from '../CustomModal';

export interface ChainModalProps {
    chain: Chain,
    open: boolean,
    onClose: () => void,
    handleSubmit: (values: Chain) => void
}

const ChainModal: FC<ChainModalProps> = ({
  open, onClose, chain, handleSubmit,
}) => (
  <CustomModal
    initialValues={chain}
    onClose={onClose}
    onSubmit={handleSubmit}
    open={open}
    title={chain.name}
  >
    {({ handleChange, values }) => (
      <>
        <TextField
          fullWidth
          label="Nome do Rede"
          value={values.name}
          name="name"
          variant="outlined"
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="CNPJ da Rede"
          value={values.identification}
          name="identification"
          variant="outlined"
          onChange={handleChange}
          margin="normal"
        />
      </>
    )}
  </CustomModal>
);

export default ChainModal;
