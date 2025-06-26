// src/services/api.js
import axios from 'axios';

export const api = axios.create({
  baseURL: '/api',    // sem host!
  withCredentials: true
});
