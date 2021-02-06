import {
  atomFamily, DefaultValue, selector, selectorFamily,
} from 'recoil';
import { Store } from '../types';
import { getStoresByChain } from '../config/api';
import { currentChainId } from './chains';
import { currentUserId } from './users';

const storesQuery = selectorFamily<Array<Store>, number>({
  key: 'storesQuery',
  get: (chainId) => async () => {
    const { data } = await getStoresByChain(chainId);
    return data;
  },
});

export const storesAtom = atomFamily<Array<Store>, number>({
  key: 'storesAtom',
  default: storesQuery,
});

export const storesState = selector<Array<Store>>({
  key: 'storesState',
  get: ({ get }) => {
    const chainId = get(currentChainId);
    if (!chainId) return [];
    return get(storesAtom(chainId));
  },
  set: ({ set, get }, newValue) => {
    const chainId = get(currentChainId);
    if (!chainId) throw new Error('Chain id is missing');
    set(storesAtom(chainId), newValue);
  },
});

interface CurrentStoreProps {
  chainId: number,
  userId: number,
}

const currentStore = atomFamily<Store | null, Readonly<CurrentStoreProps>>({
  key: 'currentStore',
  default: null,
});

export const currentStoreState = selector<Store | null>({
  key: 'currentStoreState',
  get: ({ get }) => {
    const chainId = get(currentChainId);
    if (!chainId) return null;

    const userId = get(currentUserId);
    if (!userId) return null;

    return get(currentStore({ chainId, userId }));
  },
  set: ({ set, get, reset }, newValue) => {
    const chainId = get(currentChainId);
    if (!chainId) throw new Error('Chain id is missing');

    const userId = get(currentUserId);
    if (!userId) throw new Error('User id is missing');

    const params = { chainId, userId };

    if (newValue instanceof DefaultValue) {
      return reset(currentStore(params));
    }

    if (newValue) {
      set(storesState, (stores) => stores.map((s) => ({ ...s, selected: s.id === newValue.id })));
    }

    return set(currentStore(params), newValue);
  },
});

export const currentStoreId = selector<number | null>({
  key: 'currentStoreId',
  get: ({ get }) => {
    const chainId = get(currentChainId);
    if (!chainId) return null;

    const chain = get(currentStoreState);
    if (!chain) return null;
    return chain.id;
  },
});
