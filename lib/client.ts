import axios from 'axios';
import { getToken } from './auth';
export const client = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
});

client.interceptors.request.use(
    (config) => {
        // const jwtToken = getToken();
        const jwtToken =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoiSW1hZGltYWRAZ21haWwuY29tIiwiaWF0IjoxNzMyNzQyMDY4LCJleHAiOjE3MzUzMzQwNjh9.oG942aCfWrLK7BdSGlNH7ZxCFd0Qe-7oE3lTgWM_VT8';
        if (jwtToken) {
            config.headers['Authorization'] = `Bearer ${jwtToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
