import axios from "axios";
import { Product } from "../types/product";

export const API_BASE_URL = "http://localhost:5000/api";

// 🔄 Obtener todos los productos
export const getAllProducts = async (): Promise<Product[]> => {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data;
};

// 🆕 Crear un nuevo producto
export const createProduct = async (product: Partial<Product>): Promise<Product> => {
    const response = await axios.post(`${API_BASE_URL}/products`, product);
    return response.data;
};

// ✏️ Actualizar un producto existente
export const updateProduct = async (id: string, updatedProduct: Partial<Product>): Promise<Product> => {
    const response = await axios.put(`${API_BASE_URL}/products/${id}`, updatedProduct);
    return response.data;
};

// ❌ Eliminar un producto
export const deleteProduct = async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/products/${id}`);
};

// 🔍 Obtener producto por ID (opcional, para formulario de edición)
export const getProductById = async (id: string): Promise<Product> => {
    const response = await axios.get(`${API_BASE_URL}/products/${id}`);
    return response.data;
};

// 🎲 Obtener productos aleatorios (ya lo tienes)
export const getRandomProducts = async (): Promise<Product[]> => {
    const response = await axios.get(`${API_BASE_URL}/products/random`);
    return response.data;
};
