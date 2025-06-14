import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3002';
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axios;