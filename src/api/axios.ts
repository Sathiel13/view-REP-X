import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5000', //  backend
    withCredentials: true,            // Manejo de cookies
});

export default instance;
