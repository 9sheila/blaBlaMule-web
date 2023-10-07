import createHttp from './BaseService';

const http = createHttp(true);

export const getCurrentUser = () => http.get('/api/users/me');

export const getUser = (id) => http.get(`/api/user/detail/${id}`);