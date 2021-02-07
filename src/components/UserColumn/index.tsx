import React, { FunctionComponent, memo } from 'react';
import { useSetRecoilState } from 'recoil';
import { Typography } from '@material-ui/core';
import { currentUserState, usersAtom } from '../../recoil/users';
import CardList from '../CardList';
import CustomCard from '../CustomCard';
import useModalHelper from '../../hooks/useModalHelper';
import UserModal from '../UserModal';

const UserColumn: FunctionComponent = () => {
  const setUser = useSetRecoilState(currentUserState);
  const {
    value: editUser, isModalOpen, handleOpen, handleClose, handleEdit,
  } = useModalHelper(usersAtom);
  return (
    <>
      <CardList title="Usuários" recoilSelector={usersAtom}>
        {(user) => (
          <CustomCard
            selected={user.selected}
            onClick={() => setUser(user)}
            onEdit={() => handleOpen(user)}
          >
            <Typography variant="h6">{`${user.name} ${user.lastName}`}</Typography>
            <Typography>{user.role}</Typography>
          </CustomCard>
        )}
      </CardList>
      {editUser && (
      <UserModal
        user={editUser}
        open={isModalOpen}
        onClose={handleClose}
        handleSubmit={handleEdit}
      />
      )}
    </>
  );
};

export default memo(UserColumn);
