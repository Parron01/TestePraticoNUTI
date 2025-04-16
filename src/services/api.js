import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:8080',
    // baseURL: 'https://nuti.parron01.com/api',
});
