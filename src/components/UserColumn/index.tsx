import { Typography } from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { User } from '../../types';
import CustomCard from '../CustomCard';
import { currentUser, currentUserId } from '../../recoil/users';

export interface UserCardProps {
    user: User,
}

const UserCard: FunctionComponent<UserCardProps> = ({ user }) => {
  const userId = useRecoilValue(currentUserId);
  const setUser = useSetRecoilState(currentUser);
  return (
    <CustomCard isSelected={userId === user.id} onClick={() => setUser(user)}>
      <Typography variant="h6">{`${user.name} ${user.lastName}`}</Typography>
      <Typography>{user.role}</Typography>
    </CustomCard>
  );
};

export default React.memo(UserCard);
