import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle 401 errors (unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const login = async (username, password) => {
  const response = await api.post('/login', { username, password });
  return response.data;
};

export const getCountries = async (name = null, limit = null) => {
  const params = {};
  if (name) params.name = name;
  if (limit) params.limit = limit;
  const response = await api.get('/countries', { params });
  return response.data;
};

export const getCountryById = async (id) => {
  const response = await api.get(`/countries/${id}`);
  return response.data;
};

export const createCountry = async (countryData) => {
  const response = await api.post('/countries', countryData);
  return response.data;
};

export const updateCountry = async (id, countryData) => {
  const response = await api.put(`/countries/${id}`, countryData);
  return response.data;
};

export const deleteCountry = async (id) => {
  const response = await api.delete(`/countries/${id}`);
  return response.data;
};

export const getCountriesStats = async () => {
  const response = await api.get('/countries/stats');
  return response.data;
};

export const getContinents = async () => {
  const response = await api.get('/countries/continents');
  return response.data;
};

export const getTopCountriesByPopulation = async (limit = 10) => {
  const response = await api.get('/countries/population/top', { params: { limit } });
  return response.data;
};

export const getRecentCountries = async (limit = 5) => {
  const response = await api.get('/countries/recent', { params: { limit } });
  return response.data;
};

export const getCountriesByContinent = async (continent) => {
  const response = await api.get(`/countries/by-continent/${continent}`);
  return response.data;
};

export default api;


