import { useEffect, useState } from "react";
import {DashboardMetrics, getDashboardMetrics} from "../../api/orderAPI.ts";


export default function AdminDashboard() {
    const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);

    useEffect(() => {
        getDashboardMetrics().then(setMetrics).catch(console.error);
    }, []);

    if (!metrics) return <p>Cargando métricas...</p>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Resumen del Panel</h1>
            <ul>
                <li>Total de ventas: ${metrics.totalRevenue}</li>
                <li>Órdenes completadas: {metrics.completedOrders}</li>
                <li>Productos vendidos: {metrics.totalItemsSold}</li>
                <li>Usuarios registrados: {metrics.totalUsers}</li>
                <li>Órdenes pagadas: {metrics.ordersByStatus.pagadas}</li>
            </ul>
            {/* Aquí podrías graficar dailySales con Chart.js */}
        </div>
    );
}
