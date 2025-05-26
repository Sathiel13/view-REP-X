// src/types/order.ts
export interface Order {
    _id: string;
    user: string;
    products: { product: string; quantity: number }[];
    total: number;
    paymentStatus: "pending" | "paid" | "failed";
    deliveryStatus: "processing" | "shipped" | "delivered";
    createdAt: string;
    updatedAt?: string;
}