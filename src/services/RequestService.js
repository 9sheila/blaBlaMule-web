import createHttp from "./BaseService";

const http = createHttp(true);

export const sendRequest = (id, body) => http.post(`/api/request/${id}`, body);

export const getRequests = () => http.get('/api/requests');

export const respondToRequest = (id, status) => http.patch(`/api/request/edit/${id}`, { status });

export const getPendingRequests = () => http.get('/api/requests/pending');

export const cancelRequest = (id) => http.delete(`/api/request/delete/${id}`);

export const getAcceptedRequest = (id) => http.get(`/api/request/accepted/${id}`);