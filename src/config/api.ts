import axios, { AxiosResponse } from 'axios';
import {
  Chain, Product, Store, User,
} from '../types';

const api = axios.create({
  baseURL: 'http://localhost:1500',
});

export const getUsers = (): Promise<AxiosResponse<Array<User>>> => api.get<Array<User>>('/users');

export const getChainsByUser = (userId: number): Promise<AxiosResponse<Array<Chain>>> => api.get<Array<Chain>>(`/users/${userId}/chains`);

export const getStoresByChain = (chainId: number): Promise<AxiosResponse<Array<Store>>> => api.get<Array<Store>>(`/chains/${chainId}/stores`);

export const getProductsByStore = (storeId: number): Promise<AxiosResponse<Array<Product>>> => api.get<Array<Product>>(`/stores/${storeId}/products`);
