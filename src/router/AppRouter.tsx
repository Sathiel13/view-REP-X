import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from '../pages/Register';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Catalog from "../pages/Catalog";
import ProductDetail from "../pages/ProductDetail";
import Checkout from "../pages/Checkout"; // Nueva página de Checkout
import OrderSuccess from "../pages/OrderSuccess"; // Página de confirmación
import StripeProvider from "../components/StripeProvider"; // Importamos el proveedor de Stripe

import RoleProtectedRoute from "../components/RoleProtectedRoute";

// Layout y páginas de admin
import AdminLayout from "../layouts/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";

import ProductManagement from "../pages/admin/ProductManagement";
import CouponManagement from "../pages/admin/CouponManagement";
import OrderManagement from "../pages/admin/OrderManagement";
import Cart from "../components/Cart.tsx";
import { CartProvider } from "../context/CartContext.tsx";

export default function AppRouter() {
    return (
        <CartProvider>
            <BrowserRouter>
                <Routes>
                    {/* Rutas públicas */}
                    <Route path="/" element={<Home />} />
                    <Route path="/catalog" element={<Catalog />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/product/:id" element={<ProductDetail />} />

                    {/* Rutas relacionadas al pago */}
                    <Route
                        path="/checkout"
                        element={
                            <StripeProvider> {/* Proveedor de Stripe */}
                                <Checkout />
                            </StripeProvider>
                        }
                    />
                    <Route
                        path="/order-success"
                        element={
                            <StripeProvider> {/* Proveedor de Stripe */}
                                <OrderSuccess />
                            </StripeProvider>
                        }
                    />

                    {/* Rutas protegidas del admin envueltas en el layout */}
                    <Route path="/admin" element={
                        <RoleProtectedRoute allowedRoles={["admin"]}>
                            <AdminLayout />
                        </RoleProtectedRoute>
                    }>
                        <Route index element={<AdminDashboard />} />
                        <Route path="products" element={<ProductManagement />} />
                        <Route path="coupons" element={<CouponManagement />} />
                        <Route path="orders" element={<OrderManagement />} />
                    </Route>

                    {/* Ruta de fallback */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </BrowserRouter>
        </CartProvider>
    );
}