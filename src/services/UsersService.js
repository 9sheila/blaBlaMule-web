import createHttp from './BaseService';

const http = createHttp(true);

export const getCurrentUser = () => http.get('/api/users/me');

// export const getUserTravels = () => http.get('/api/users/me/travels');

export const getUser = (id) => http.get(`/api/users/detail/${id}`);

