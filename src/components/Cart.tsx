import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart: React.FC = () => {
    const { cartItems, total, removeFromCart, clearCart } = useCart() as {
        cartItems: {
            product: {
                _id: string;
                name: string;
                price: number;
                image?: string;
                description?: string;
            };
            quantity: number;
        }[];
        total: number;
        removeFromCart: (id: string) => void;
        clearCart: () => void;
    };

    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-6">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Tu Carrito de Compras</h1>

            {cartItems.length > 0 ? (
                <>
                    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
                        <ul className="divide-y divide-gray-200">
                            {cartItems.map((item) => (
                                <li
                                    key={item.product._id}
                                    className="flex py-5 gap-5 items-center"
                                >
                                    {/* Imagen del producto */}
                                    <img
                                        src={item.product.image || "https://via.placeholder.com/150"}
                                        alt={item.product.name}
                                        className="h-24 w-24 rounded-md object-cover border"
                                    />

                                    {/* Información del producto */}
                                    <div className="flex-1">
                                        <h2 className="text-lg font-semibold text-gray-800">
                                            {item.product.name}
                                        </h2>
                                        <p className="text-sm text-gray-500">
                                            {item.product.description || "Sin descripción disponible."}
                                        </p>
                                        <p className="text-gray-600 mt-1">
                                            Cantidad:{" "}
                                            <span className="font-semibold">{item.quantity}</span>
                                        </p>
                                    </div>

                                    {/* Precio y acciones */}
                                    <div className="text-right">
                                        <p className="text-xl font-bold text-gray-900">
                                            ${(item.product.price * item.quantity).toFixed(2)}
                                        </p>
                                        <button
                                            onClick={() => removeFromCart(item.product._id)}
                                            className="mt-3 text-red-600 hover:text-red-800 font-medium cursor-pointer transition"
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        {/* Total y acciones */}
                        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center">
                            <h2 className="text-2xl font-bold text-gray-800">
                                Total: ${total.toFixed(2)}
                            </h2>
                            <div className="flex gap-4 mt-4 sm:mt-0">
                                <button
                                    onClick={clearCart}
                                    className="bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-black transition"
                                >
                                    Vaciar Carrito
                                </button>
                                <button
                                    onClick={() => navigate("/checkout")}
                                    className="bg-purple-600 text-white py-2 px-6 rounded-md hover:bg-purple-700 transition"
                                >
                                    Proceder al Pago
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="text-center mt-20">
                    <p className="text-lg text-gray-600">Tu carrito está vacío.</p>
                    <button
                        onClick={() => navigate("/catalog")}
                        className="mt-6 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition"
                    >
                        Ir al Catálogo
                    </button>
                </div>
            )}
        </div>
    );
};

export default Cart;