import axios, { AxiosInstance, AxiosError } from 'axios';
import type { Item, ItemCreate, ItemUpdate, ApiError } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    if (error.response) {
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      console.error('Network Error:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export const apiService = {
  async healthCheck(): Promise<{ status: string; service: string }> {
    const response = await apiClient.get('/api/v1/health/');
    return response.data;
  },

  async dbHealthCheck(): Promise<{ status: string; database: string }> {
    const response = await apiClient.get('/api/v1/health/db');
    return response.data;
  },

  async getItems(skip: number = 0, limit: number = 100): Promise<Item[]> {
    const response = await apiClient.get<Item[]>('/api/v1/items/', {
      params: { skip, limit },
    });
    return response.data;
  },

  async getItem(id: number): Promise<Item> {
    const response = await apiClient.get<Item>(`/api/v1/items/${id}`);
    return response.data;
  },

  async createItem(itemData: ItemCreate): Promise<Item> {
    const response = await apiClient.post<Item>('/api/v1/items/', itemData);
    return response.data;
  },

  async updateItem(id: number, itemData: ItemUpdate): Promise<Item> {
    const response = await apiClient.put<Item>(`/api/v1/items/${id}`, itemData);
    return response.data;
  },

  async deleteItem(id: number): Promise<void> {
    await apiClient.delete(`/api/v1/items/${id}`);
  },
};

export default apiClient;
