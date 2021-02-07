import {
  atomFamily, selector,
} from 'recoil';
import { Product } from '../types';
import { getProductsByStore } from '../config/api';
import { currentStoreId } from './stores';

const productsQuery = async (storeId: number): Promise<Array<Product>> => {
  const { data } = await getProductsByStore(storeId);
  return data;
};

export const productsAtom = atomFamily<Array<Product>, number>({
  key: 'productsAtom',
  default: (storeId) => productsQuery(storeId),
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
