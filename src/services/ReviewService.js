import createHttp from "./BaseService";

const http = createHttp(true);

export const createReview = (body) => http.post(`/api/review/create`, body);

export const getReview = (id) => http.get(`/api/review/list/${id}`);

export const deleteReview = (reviewId) => http.delete(`/api/review/delete/${reviewId}`)