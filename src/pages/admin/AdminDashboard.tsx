import { useEffect, useState } from "react";
import { DashboardMetrics, getDashboardMetrics } from "../../api/orderAPI";

const AdminDashboard = () => {
    const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const data = await getDashboardMetrics();
                setMetrics(data);
            } catch (error) {
                console.error("Error al obtener métricas del dashboard:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMetrics();
    }, []);

    if (loading) return <p>Cargando métricas del dashboard...</p>;
    if (!metrics) return <p>No se pudo cargar la información del dashboard.</p>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Resumen del Panel</h1>
            <ul>
                <li>Total de ventas: ${metrics.totalRevenue.toFixed(2)}</li>
                <li>Órdenes completadas: {metrics.completedOrders}</li>
                <li>Productos vendidos: {metrics.totalItemsSold}</li>
                <li>Usuarios registrados: {metrics.totalUsers}</li>
                <li>Órdenes pagadas: {metrics.ordersByStatus.pagadas}</li>
                <li>Órdenes pendientes de pago: {metrics.ordersByStatus.pendientesPago}</li>
                <li>Órdenes entregadas: {metrics.ordersByStatus.entregadas}</li>
                <li>Órdenes pendientes de entrega: {metrics.ordersByStatus.pendientesEntrega}</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6">Ventas Diarias (últimos 7 días)</h2>
            <ul>
                {metrics.dailySales.map((day) => (
                    <li key={day._id}>
                        {day._id}: ${day.total.toFixed(2)}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboard;
