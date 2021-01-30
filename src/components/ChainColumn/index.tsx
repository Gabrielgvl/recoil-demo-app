import React, { FunctionComponent } from 'react';
import { useRecoilValue } from 'recoil';
import { currentUserId, usersAtom } from '../../recoil/users';
import UserCard from '../UserCard';
import CardColumn from '../CardColumn';

const UserColumn: FunctionComponent = () => {
  const userId = useRecoilValue(currentUserId);
  return (
    <CardColumn title="Usuarios" recoilSelector={usersAtom}>
      {(user) => (
        <UserCard user={user} currentUserId={userId} />
      )}
    </CardColumn>
  );
};

export default UserColumn;
