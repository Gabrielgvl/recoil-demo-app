import React, { FunctionComponent } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Typography } from '@material-ui/core';
import { currentUser, currentUserId, usersAtom } from '../../recoil/users';
import CardList from '../CardList';
import CustomCard from '../CustomCard';

const UserColumn: FunctionComponent = () => {
  const userId = useRecoilValue(currentUserId);
  const setUser = useSetRecoilState(currentUser);
  return (
    <CardList title="Usuarios" recoilSelector={usersAtom}>
      {(user) => (
        <CustomCard selected={userId === user.id} onClick={() => setUser(user)}>
          <Typography variant="h6">{`${user.name} ${user.lastName}`}</Typography>
          <Typography>{user.role}</Typography>
        </CustomCard>
      )}
    </CardList>
  );
};

export default UserColumn;
