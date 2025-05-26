import axios from "axios";
import type { Order } from '../types/order'; // Usando la definición única

// Obtener todas las órdenes
export const getAllOrders = async (): Promise<Order[]> => {
    try {
        const response = await axios.get<Order[]>("/api/orders", { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error al obtener órdenes", error);
        throw error;
    }
};

// Actualizar el estado de una orden
export const updateOrderStatus = async (
    orderId: string,
    status: { paymentStatus?: string; deliveryStatus?: string }
): Promise<Order> => {
    try {
        const response = await axios.patch<Order>(`/api/orders/${orderId}/status`, status, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error al actualizar estado de orden", error);
        throw error;
    }
};