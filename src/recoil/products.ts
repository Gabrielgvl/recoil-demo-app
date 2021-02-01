import {
  atomFamily, selector, selectorFamily,
} from 'recoil';
import { Product } from '../types';
import { getProductsByStore } from '../config/api';
import { currentStoreId } from './stores';

const productsQuery = selectorFamily<Array<Product>, number>({
  key: 'productsQuery',
  get: (storeId) => async () => {
    const { data } = await getProductsByStore(storeId);
    return data;
  },
});

export const productsAtom = atomFamily<Array<Product>, number>({
  key: 'productsAtom',
  default: productsQuery,
});

export const productsState = selector<Array<Product>>({
  key: 'productsState',
  get: ({ get }) => {
    const storeId = get(currentStoreId);
    if (!storeId) return [];
    return get(productsAtom(storeId));
  },
  set: ({ set, get }, newValue) => {
    const storeId = get(currentStoreId);
    if (!storeId) throw new Error('Store id is missing');
    set(productsAtom(storeId), newValue);
  },
});

const currentProduct = atomFamily<Product | null, number>({
  key: 'currentProduct',
  default: null,
});

export const currentProductState = selector<Product | null>({
  key: 'currentProductState',
  get: ({ get }) => {
    const storeId = get(currentStoreId);
    if (!storeId) throw new Error('User id is missing');

    const product = get(currentProduct(storeId));
    if (!product) return null;

    return product;
  },
  set: ({ set, get }, newValue) => {
    const storeId = get(currentStoreId);
    if (!storeId) throw new Error('Chain id is missing');

    return set(currentProduct(storeId), newValue);
  },
});
