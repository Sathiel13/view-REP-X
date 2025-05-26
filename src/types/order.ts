// src/types/order.ts
export interface Order {
    _id: string;
    user: string;
    total: number;
    paymentStatus: "pending" | "paid" | "failed";
    deliveryStatus: "processing" | "shipped" | "delivered";
    createdAt: string;
    updatedAt?: string;
}
