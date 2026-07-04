import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchServices = async () => {
  try {
    const response = await api.get('/services');
    return response.data;
  } catch (error) {
    console.error('Error fetching services:', error);
    return null;
  }
};

export const fetchGallery = async () => {
  try {
    const response = await api.get('/gallery');
    return response.data;
  } catch (error) {
    console.error('Error fetching gallery:', error);
    return null;
  }
};

export const submitContact = async (formData) => {
  try {
    const response = await api.post('/contact', formData);
    return response.data;
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error.response?.data || { success: false, message: 'An unexpected error occurred.' };
  }
};

export default api;
