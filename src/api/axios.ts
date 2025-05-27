import axios from 'axios';

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // Correcto para Vite
    withCredentials: true,
});

export default instance;
