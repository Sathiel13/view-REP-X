import axios from "axios";

const API_URL = "http://localhost:5000/api/admin/cupon";

// Crear un cupón
export const createCoupon = async (couponData: any, token: string) => {
    try {
        const response = await axios.post(API_URL, couponData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error al crear el cupón:", error);
        throw error;
    }
};

// Obtener todos los cupones
export const getAllCoupons = async (token: string) => {
    try {
        const response = await axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error al obtener los cupones:", error);
        throw error;
    }
};

// Desactivar un cupón
export const deactivateCoupon = async (couponId: string, token: string) => {
    try {
        const response = await axios.put(`http://localhost:5000/api/${couponId}/deactivate/cupon`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error al desactivar el cupón:", error);
        throw error;
    }
};

// Activar un cupón
export const activateCoupon = async (couponId: string, token: string) => {
    try {
        const response = await axios.put(`http://localhost:5000/api/${couponId}/activate/cupon`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error al activar el cupón:", error);
        throw error;
    }
};