import axios from "axios";
// Importa Order como ApiOrder para evitar conflicto con la interfaz local
import type { Order as ApiOrder } from '../types/order';

// Define la interfaz de una métrica del dashboard
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

// Llama al backend para obtener métricas
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

// (Opcional) Si la interfaz local es igual o muy similar, podrías eliminar esta definición local y usar ApiOrder directamente.
// Si decides mantenerla, asegúrate que no haya conflicto de nombres.

export interface Order {
    _id: string;
    user: string;
    products: { product: string; quantity: number }[];
    total: number;
    paymentStatus: "pending" | "paid" | "failed";
    deliveryStatus: "processing" | "shipped" | "delivered";
    createdAt: string;
    updatedAt: string;
}

// Obtener todas las órdenes usando la interfaz importada con alias ApiOrder
export const getAllOrders = async (): Promise<ApiOrder[]> => {
    try {
        const response = await axios.get<ApiOrder[]>("/api/orders", { withCredentials: true });
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
): Promise<ApiOrder> => {
    try {
        const response = await axios.patch<ApiOrder>(`/api/orders/${orderId}/status`, status, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error al actualizar estado de orden", error);
        throw error;
    }
};
