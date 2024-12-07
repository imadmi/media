import axios from 'axios';
import { getToken } from './auth';
export const client = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
});

client.interceptors.request.use(
    (config) => {
        const jwtToken = getToken()?.access;
        // const jwtToken =
        //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoiSW1hZGltYWRAZ21haWwuY29tIiwiaWF0IjoxNzMzNDMzMDQ2LCJleHAiOjE3MzYwMjUwNDZ9.C_A7hZfmgXhxi5rSW6lWWszb4hm5QrrOIKMellzqC-0';
        if (jwtToken) {
            config.headers['Authorization'] = `Bearer ${jwtToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
