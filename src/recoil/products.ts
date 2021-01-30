import {
  atomFamily, selector, selectorFamily,
} from 'recoil';
import { Store } from '../types';
import { getStoresByChain } from '../config/api';
import { currentChainId, hasCurrentChain } from './chains';

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

const currentStore = atomFamily<Store | null, number>({
  key: 'currentStore',
  default: null,
});

export const currentStoreState = selector<Store | null>({
  key: 'currentStoreState',
  get: ({ get }) => {
    const chainId = get(currentChainId);
    if (!chainId) throw new Error('User id is missing');

    return get(currentStore(chainId));
  },
  set: ({ set, get }, newValue) => {
    const chainId = get(currentChainId);
    if (!chainId) throw new Error('Chain id is missing');

    return set(currentStore(chainId), newValue);
  },
});

export const currentStoreId = selector<number | null>({
  key: 'currentStoreId',
  get: ({ get }) => {
    const chainId = get(currentChainId);
    if (!chainId) throw new Error('Chain id is missing');

    const chain = get(currentStore(chainId));
    if (!chain) return null;
    return chain.id;
  },
});

export const hasCurrentStore = selector<boolean>({
  key: 'hasCurrentStore',
  get: ({ get }) => {
    const hasChain = get(hasCurrentChain);
    if (!hasChain) return false;
    return !!get(currentStoreState);
  },
});
