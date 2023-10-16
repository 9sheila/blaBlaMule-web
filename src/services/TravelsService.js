import createHttp from "./BaseService";

const http = createHttp(true);

export const getTravels = () => http.get('/api/travelsList');

export const addTrip = (travel) => http.post('/api/addTrip', travel);

export const getTravel = (id) => http.get(`/api/travels/details/${id}`);

