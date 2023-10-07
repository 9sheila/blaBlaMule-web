import createHttp from "./BaseService";

const http = createHttp(true);

export const createReview = (id, body) => http.post(`/review/create/${id}`, body);

export const getReview = (id) => http.get(`/review/list/${id}`);

export const deleteReview = (reviewId) => http.delete(`/review/delete/${reviewId}`)