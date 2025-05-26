// src/types/order.ts
export interface Order {
    _id: string;
    user: string;
    total: number;
    status: "pagada" | "pendientePago" | "entregada" | "pendienteEntrega";
    paymentStatus?: string;       // si aplica, hazlo opcional o según sea tu modelo real
    deliveryStatus?: string;      // si aplica, igual
    createdAt: string;
    // Añade aquí otras propiedades que manejes en tu API
}
