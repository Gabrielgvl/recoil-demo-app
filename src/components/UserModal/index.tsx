import { FC } from 'react';
import { TextField } from '@material-ui/core';
import { User } from '../../types';
import CustomModal from '../CustomModal';

export interface UserModalProps {
    user: User,
    open: boolean,
    onClose: () => void,
    handleSubmit: (values: User) => void,
}

const UserModal: FC<UserModalProps> = ({
  open, onClose, user, handleSubmit,
}) => (
  <CustomModal
    initialValues={user}
    onClose={onClose}
    onSubmit={handleSubmit}
    open={open}
    title={user.name}
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
          label="Nome"
          value={values.lastName}
          name="lastName"
          variant="outlined"
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Cargo"
          value={values.role}
          name="role"
          variant="outlined"
          onChange={handleChange}
          margin="normal"
        />
      </>
    )}
  </CustomModal>
);

export default UserModal;
