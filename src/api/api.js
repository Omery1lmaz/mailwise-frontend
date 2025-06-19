import axios from 'axios';

const API_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL
});

// Her istekte token ekle
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (email, password) =>
  api.post('/admin/login', { email, password });

export const getQueueEmails = (page = 1, limit = 20) =>
  api.get(`/admin/queue-emails?page=${page}&limit=${limit}`);

export const getProcessingEmails = (page = 1, limit = 20) =>
  api.get(`/admin/processing-emails?page=${page}&limit=${limit}`);

export const getNotSendedEmails = (page = 1, limit = 20) =>
  api.get(`/admin/not-sended-emails?page=${page}&limit=${limit}`);

export const getEmailStatsByDate = (days = 7) =>
  api.get(`/admin/email-stats-by-date?days=${days}`);

export const getEmailStatsByCountry = () =>
  api.get('/admin/email-stats-by-country');

export const uploadCsv = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return api.post('/queue/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

export const sendBatch = () =>
  api.post('/queue/send-batch'); 