import { atom, DefaultValue, selector } from 'recoil';
import { User } from '../types';
import { getUsers } from '../config/api';

const usersQuery = async () => {
  const { data } = await getUsers();
  return data;
};

export const usersAtom = atom<Array<User>>({
  key: 'usersAtom',
  default: usersQuery(),
});

const currentUser = atom<User | null>({
  key: 'currentUser',
  default: null,
});

export const currentUserState = selector<User | null>({
  key: 'currentUserState',
  get: ({ get }) => get(currentUser),
  set: ({ set, reset }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return reset(currentUser);
    }
    if (newValue) {
      set(usersAtom, (users) => users.map((u) => ({ ...u, selected: u.id === newValue.id })));
    }
    return set(currentUser, newValue);
  },
});

export const currentUserId = selector<number | null>({
  key: 'currentUserId',
  get: ({ get }) => {
    const user = get(currentUserState);
    if (!user) return null;
    return user.id;
  },
});
