import { post } from '@/utils/request';

export const register = (params) => post('/user/register', params);
export const login = (params) => post('/user/login', params);
