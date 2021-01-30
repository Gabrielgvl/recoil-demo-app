import {
  atom, atomFamily, selector, selectorFamily,
} from 'recoil';
import { Chain } from '../types';
import { getChainsByUser } from '../config/api';
import { currentUserId } from './users';

const chainsQuery = selectorFamily<Array<Chain>, number>({
  key: 'chainsQuery',
  get: (userId) => async () => {
    const { data } = await getChainsByUser(userId);
    return data;
  },
});

export const chainsAtom = atomFamily<Array<Chain>, number>({
  key: 'chainsAtom',
  default: chainsQuery,
});

export const chainsState = selector<Array<Chain>>({
  key: 'chainsState',
  get: ({ get }) => {
    const userId = get(currentUserId);
    if (!userId) return [];
    return get(chainsAtom(userId));
  },
  set: ({ set, get }, newValue) => {
    const userId = get(currentUserId);
    if (!userId) throw new Error('User id is missing');
    set(chainsAtom(userId), newValue);
  },
});

export const currentChain = atomFamily<Chain | null, number>({
  key: 'currentChain',
  default: null,
});

export const currentChainState = selector<Chain | null>({
  key: 'currentChainState',
  get: ({ get }) => {
    const userId = get(currentUserId);
    if (!userId) throw new Error('User id is missing');

    return get(currentChain(userId));
  },
  set: ({ set, get }, newValue) => {
    const userId = get(currentUserId);
    if (!userId) throw new Error('User id is missing');

    return set(currentChain(userId), newValue);
  },
});

export const currentChainId = selector<number | null>({
  key: 'currentChainId',
  get: ({ get }) => {
    const userId = get(currentUserId);
    if (!userId) throw new Error('User id is missing');

    const chain = get(currentChain(userId));
    if (!chain) return null;
    return chain.id;
  },
});

// export const hasCurrentChain = selector<boolean>({
//   key: 'hasCurrentChain',
//   get: ({ get }) => !!get(currentChain),
// });