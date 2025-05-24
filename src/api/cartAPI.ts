import axios from "axios";

// URL base de la API
const API_URL = "http://localhost:5000/api/cart";

// Agregar producto al carrito
export const addToCartAPI = async (productId: string, quantity: number) => {
    const response = await axios.post(
        API_URL,
        { productId, quantity },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`, // Debe tener el token en el localStorage
            },
        }
    );
    return response.data;
};

// Obtener el carrito del usuario
export const getCartAPI = async () => {
    const response = await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return response.data;
};

// Eliminar un producto del carrito
export const removeFromCartAPI = async (productId: string) => {
    const response = await axios.delete(`${API_URL}/${productId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return response.data;
};

// Vaciar el carrito
export const clearCartAPI = async () => {
    const response = await axios.delete(API_URL, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return response.data;
};