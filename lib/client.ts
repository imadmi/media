import axios from 'axios';
import { getToken } from './auth';
export const client = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
});

client.interceptors.request.use(
    (config) => {
        // const userToken = getToken();
        const userToken =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoiSW1hZGltYWRAZ21haWwuY29tIiwiaWF0IjoxNzMyNDc1NzIzLCJleHAiOjE3MzI3MzQ5MjN9.O5vxzbPuH5oP6_mluXt07YGrqDB3Sd2wPIEmPvqzmfE';
        if (userToken) {
            config.headers['Authorization'] = `Bearer ${userToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
