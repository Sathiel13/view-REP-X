import axios from "axios";
import type { Order } from '../types/order'; // Usando la definición única

// Definición de las métricas del dashboard
export interface DashboardMetrics {
    totalRevenue: number;
    totalItemsSold: number;
    totalUsers: number;
    completedOrders: number;
    ordersByStatus: {
        pagadas: number;
        pendientesPago: number;
        entregadas: number;
        pendientesEntrega: number;
    };
    dailySales: { _id: string; total: number }[];
}

// Obtener métricas del dashboard
export const getDashboardMetrics = async (): Promise<DashboardMetrics> => {
    try {
        const response = await axios.get<DashboardMetrics>("/api/admin/dashboard-metrics", {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error obteniendo métricas del dashboard", error);
        throw error;
    }
};

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