import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';
const API_KEY = process.env.REACT_APP_API_KEY;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY
  },
  timeout: 10000
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('Erreur API:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('Pas de réponse du serveur');
    } else {
      console.error('Erreur:', error.message);
    }
    return Promise.reject(error);
  }
);

// === CATÉGORIES ===

export const getCategories = async () => {
  try {
    const response = await api.get('/categories');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCategoryById = async (id) => {
  try {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// === ARTISANS ===

export const getAllArtisans = async (params = {}) => {
  try {
    const response = await api.get('/artisans', { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getArtisanById = async (id) => {
  try {
    const response = await api.get(`/artisans/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTopArtisans = async () => {
  try {
    const response = await api.get('/artisans/top');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchArtisans = async (filters) => {
  const params = {};
  
  if (filters.search) params.search = filters.search;
  if (filters.category) params.category = filters.category;
  if (filters.specialty) params.specialty = filters.specialty;
  if (filters.location) params.location = filters.location;
  if (filters.minNote) params.minNote = filters.minNote;
  if (filters.top) params.top = filters.top;
  if (filters.page) params.page = filters.page;
  if (filters.limit) params.limit = filters.limit;

  return getAllArtisans(params);
};

export default api;