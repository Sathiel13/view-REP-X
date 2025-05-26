import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAllOrders, updateOrderStatus } from "../../api/orderAPI";
import type { Order as ApiOrder } from "../../types/order";

// Interfaz local para UI
interface UIOrder {
    _id: string;
    user: string;
    total: number;
    status: "pagada" | "pendientePago" | "entregada" | "pendienteEntrega";
    createdAt: string;
}

const OrderManagement = () => {
    const [orders, setOrders] = useState<UIOrder[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data: ApiOrder[] = await getAllOrders();

                // Transformar ApiOrder[] a UIOrder[]
                const transformedOrders: UIOrder[] = data.map((order) => {
                    let status: UIOrder["status"];

                    if (order.paymentStatus === "paid") status = "pagada";
                    else if (order.paymentStatus === "pending") status = "pendientePago";
                    else if (order.deliveryStatus === "delivered") status = "entregada";
                    else status = "pendienteEntrega";

                    return {
                        _id: order._id,
                        user: order.user,
                        total: order.total,
                        status,
                        createdAt: order.createdAt,
                    };
                });

                setOrders(transformedOrders);
            } catch (error) {
                console.error("Error al cargar las órdenes:", error);
                toast.error("Error al cargar las órdenes.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleUpdateOrderStatus = async (id: string, newStatus: UIOrder["status"]) => {
        try {
            let paymentStatus = "";
            let deliveryStatus = "";

            switch (newStatus) {
                case "pagada":
                    paymentStatus = "paid";
                    break;
                case "pendientePago":
                    paymentStatus = "pending";
                    break;
                case "entregada":
                    deliveryStatus = "delivered";
                    break;
                case "pendienteEntrega":
                    deliveryStatus = "processing";
                    break;
            }

            const statusPayload: { paymentStatus?: string; deliveryStatus?: string } = {};
            if (paymentStatus) statusPayload.paymentStatus = paymentStatus;
            if (deliveryStatus) statusPayload.deliveryStatus = deliveryStatus;

            await updateOrderStatus(id, statusPayload);

            // Actualizar el estado local
            setOrders((prev) =>
                prev.map((order) =>
                    order._id === id ? { ...order, status: newStatus } : order
                )
            );

            toast.success("Estado de la orden actualizado.");
        } catch (error) {
            console.error("Error al actualizar el estado:", error);
            toast.error("Error al actualizar el estado de la orden.");
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Gestión de Órdenes</h2>
            {loading ? (
                <div>Cargando órdenes...</div>
            ) : orders.length === 0 ? (
                <div className="text-gray-500">No hay órdenes disponibles.</div>
            ) : (
                <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Usuario
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Total
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Estado
                            </th>
                            <th className="px-6 py-3"></th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.user}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">${order.total.toFixed(2)}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{order.status}</td>
                                <td className="px-6 py-4 text-sm font-medium">
                                    <button
                                        onClick={() => handleUpdateOrderStatus(order._id, "entregada")}
                                        className="text-sm text-green-600 hover:text-green-800"
                                        type="button"
                                    >
                                        Completar
                                    </button>
                                    <button
                                        onClick={() => handleUpdateOrderStatus(order._id, "pendienteEntrega")}
                                        className="text-sm text-red-600 hover:text-red-800 ml-4"
                                        type="button"
                                    >
                                        Cancelar
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default OrderManagement;