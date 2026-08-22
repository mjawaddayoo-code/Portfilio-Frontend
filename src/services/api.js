import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/api`;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('portfolio_admin_token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('portfolio_admin_token');
      localStorage.removeItem('portfolio_admin');

      if (!window.location.pathname.includes('/admin/login')) {
        window.location.href = '/admin/login';
      }
    }

    return Promise.reject(error);
  }
);

export const getErrorMessage = (error) =>
  error?.response?.data?.message ||
  error?.message ||
  'Something went wrong. Please try again.';

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);

  const { data } = await api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data.url;
};

export default api;
