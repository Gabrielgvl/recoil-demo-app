import { atom, selector } from 'recoil';
import { User } from '../types';
import { getUsers } from '../config/api';

const usersQuery = selector<Array<User>>({
  key: 'usersQuery',
  get: async () => {
    const { data } = await getUsers();
    return data;
  },
});

export const usersAtom = atom<Array<User>>({
  key: 'usersAtom',
  default: usersQuery,
});

export const currentUser = atom<User | null>({
  key: 'currentUser',
  default: null,
});

export const currentUserId = selector<number | null>({
  key: 'currentUserId',
  get: ({ get }) => {
    const user = get(currentUser);
    if (!user) return null;
    return user.id;
  },
});

export const hasCurrentUser = selector<boolean>({
  key: 'hasCurrentUser',
  get: ({ get }) => !!get(currentUser),
});
