import axios from 'axios';

// const API_URL = 'https://mailwise-server.onrender.com';
const API_URL = 'http://localhost:3000';
// const API_URL = 'https://mailwise-server-f9lj.vercel.app';


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

export const login = (email, password, role) =>
  role === 'user'
    ? api.post('/user/login', { email, password })
    : api.post('/admin/login', { email, password });

export const getQueueEmails = (page = 1, limit = 20, filters = {}) => {
  const params = new URLSearchParams({ page, limit });
  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      params.append(key, value);
    }
  });
  return api.get(`/admin/queue-emails?${params.toString()}`);
};

export const getInbox = (page = 1, limit = 20) =>
  api.get(`/admin/inbox?page=${page}&limit=${limit}`);
export const fetchInboxApi = () =>
  api.post('/admin/fetch-inbox');
export const getProcessingEmails = (page = 1, limit = 20, filters = {}) => {
    const params = new URLSearchParams({ page, limit });
    Object.entries(filters).forEach(([key, value]) => {
        if (value) {
            params.append(key, value);
        }
    });
    return api.get(`/admin/processing-emails?${params.toString()}`);
};

export const getNotSendedEmails = (page = 1, limit = 20, filters = {}) => {
    const params = new URLSearchParams({ page, limit });
    Object.entries(filters).forEach(([key, value]) => {
        if (value) {
            params.append(key, value);
        }
    });
    return api.get(`/admin/not-sended-emails?${params.toString()}`);
};

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

export const getRecentEmails = () =>
  api.get('/admin/recent-emails');

export const getTopCompanies = () =>
  api.get('/admin/top-companies');

export const getCompanies = () =>
  api.get('/admin/companies');

export const sendQueueEmail = (id) =>
  api.post(`/queue/send/${id}`);

export const removeQueueEmail = (id) =>
  api.delete(`/queue/${id}`);

export const exportQueueEmails = () =>
  api.get('/queue/export', { responseType: 'blob' }); 