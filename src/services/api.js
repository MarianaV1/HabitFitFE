import axios from "axios";

const API = axios.create({
    baseURL: "https://habitfitbe.onrender.com/api", // Cambia esto al URL de tu backend en producción
});

// Agregar el token automáticamente en las solicitudes protegidas
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default API;
