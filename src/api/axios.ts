import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // usa la variable de entorno
    withCredentials: true,
});

export default instance;
