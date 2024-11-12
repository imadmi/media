import axios from 'axios';
import { getToken } from './auth';
export const client = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
});

client.interceptors.request.use(
    (config) => {
        const userToken = getToken();
        if (userToken) {
            config.headers['Authorization'] = `Bearer ${userToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);