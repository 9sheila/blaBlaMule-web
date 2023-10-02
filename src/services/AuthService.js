import createHttp from './BaseService';

const http = createHttp();

export const register = (user) => http.post('/api/register', user);

export const login = (user) => http.post('/api/login', user);