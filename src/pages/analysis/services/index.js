import { get, post, del } from '@/utils/request';

export const getList = () => get('/list')
export const add = (params) => post('/add', params)
export const update = (params) => post('/update', params)
export const deluser = (params) => del('/del/user', params)