import React, { FunctionComponent } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Typography } from '@material-ui/core';
import { currentUser, currentUserId, usersAtom } from '../../recoil/users';
import CardList from '../CardList';
import CustomCard from '../CustomCard';
import useModalHelper from '../../hooks/useModalHelper';
import UserModal from '../UserModal';

const UserColumn: FunctionComponent = () => {
  const userId = useRecoilValue(currentUserId);
  const setUser = useSetRecoilState(currentUser);
  const {
    value: editUser, isModalOpen, handleOpen, handleClose, handleEdit,
  } = useModalHelper(usersAtom);
  return (
    <>
      <CardList title="Usuarios" recoilSelector={usersAtom}>
        {(user) => (
          <CustomCard
            selected={userId === user.id}
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

export default UserColumn;
