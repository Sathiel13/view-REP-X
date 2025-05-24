import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAllOrders, updateOrderStatus } from "../../api/orderAPI";

// Interfaz para representar una orden
interface Order {
    _id: string;
    user: string;
    total: number;
    status: "pagada" | "pendientePago" | "entregada" | "pendienteEntrega";
    createdAt: string;
}

const OrderManagement = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true); // Añadido estado para control de carga

    // useEffect para cargar órdenes al montar el componente
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getAllOrders();
                if (Array.isArray(data)) {
                    setOrders(data);
                } else {
                    throw new Error("La respuesta no es un array");
                }
            } catch (error) {
                console.error("Error al cargar las órdenes:", error);
                toast.error("Error al cargar las órdenes.");
            } finally {
                setLoading(false); // Finalizar el estado de carga
            }
        };

        fetchOrders();
    }, []);

    // Función para actualizar el estado de una orden
    const handleUpdateOrderStatus = async (
        id: string,
        status: "pagada" | "pendientePago" | "entregada" | "pendienteEntrega"
    ) => {
        try {
            await updateOrderStatus(id, status); // Llamada a la API para actualizar el estado
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order._id === id ? { ...order, status } : order
                )
            );
            toast.success("Estado de la orden actualizado.");
        } catch (error) {
            console.error("Error al actualizar el estado:", error);
            toast.error("Error al actualizar el estado de la orden.");
        }
    };

    // Renderizado con manejo de carga y validaciones
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Gestión de Órdenes</h2>
            {loading ? ( // Mostrar un indicador de carga
                <div>Cargando órdenes...</div>
            ) : orders.length === 0 ? ( // Mostrar un mensaje si no hay órdenes
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
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                    {order.user}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    ${order.total.toFixed(2)}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    {order.status}
                                </td>
                                <td className="px-6 py-4 text-sm font-medium">
                                    <button
                                        onClick={() => handleUpdateOrderStatus(order._id, "entregada")}
                                        className="text-sm text-green-600 hover:text-green-800"
                                    >
                                        Completar
                                    </button>
                                    <button
                                        onClick={() => handleUpdateOrderStatus(order._id, "pendienteEntrega")}
                                        className="text-sm text-red-600 hover:text-red-800 ml-4"
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