import { del, post } from '@/utils/request';

export const getList = (params) => post('/list', params);
export const add = (params) => post('/add', params);
export const update = (params) => post('/update', params);
export const deluser = (params) => del('/del/user', params);
