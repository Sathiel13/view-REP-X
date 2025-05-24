import clsx from "clsx";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Home, Package, PercentCircle, ShoppingCart } from "lucide-react";

const navItems = [
    { name: "Dashboard", to: "/admin", icon: <Home className="w-4 h-4" /> },
    { name: "Productos", to: "/admin/products", icon: <Package className="w-4 h-4" /> },
    { name: "Cupones", to: "/admin/coupons", icon: <PercentCircle className="w-4 h-4" /> },
    { name: "Órdenes", to: "/admin/orders", icon: <ShoppingCart className="w-4 h-4" /> },
];

export default function AdminLayout() {
    const location = useLocation();

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r shadow-sm px-4 py-6">
                <h1 className="text-xl font-bold text-purple-700 mb-8">Admin Panel</h1>
                <nav className="space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.to}
                            to={item.to}
                            className={clsx(
                                "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-100 hover:text-purple-700 transition",
                                location.pathname === item.to ? "bg-purple-100 text-purple-700" : "text-gray-700"
                            )}
                        >
                            {item.icon}
                            {item.name}
                        </Link>
                    ))}
                </nav>
            </aside>

            {/* Contenido dinámico */}
            <main className="flex-1 p-6">
                <Outlet />
            </main>
        </div>
    );
}
