import createHttp from "./BaseService";

const http = createHttp(true);

export const getTravels = () => http.get('/api/travelsList');

