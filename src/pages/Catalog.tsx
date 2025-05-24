import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

interface Product {
    _id: string;
    name: string;
    price: number;
    description: string;
    stock: number;
    image: string;
}

const Catalog: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { addToCart } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/products");
                setProducts(response.data);
            } catch (error) {
                console.error("Error al cargar los productos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-900">
                <p className="text-xl text-gray-300 animate-pulse">Cargando productos...</p>
            </div>
        );
    }

    return (
        <div className="p-8 bg-gray-900 min-h-screen">
            <h1 className="text-4xl font-bold text-center mb-8 text-white tracking-wide">
                Catálogo de Productos
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                    <div
                        key={product._id}
                        className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-300"
                    >
                        <div className="p-6 flex flex-col items-center">
                            {/* Imagen y nombre del producto */}
                            <img
                                src={product.image || "https://via.placeholder.com/150"}
                                alt={product.name}
                                className="w-40 h-40 object-cover mb-4 rounded-lg"
                            />
                            <h2 className="text-xl font-semibold text-gray-200 text-center">
                                {product.name}
                            </h2>
                            <p className="mt-2 text-gray-400 text-md">
                                {product.description || "Sin descripción disponible."}
                            </p>

                            {/* Precio y stock */}
                            <p className="mt-4 text-lg font-semibold text-white">
                                ${product.price.toFixed(2)}
                            </p>
                            <p
                                className={`text-sm font-medium mt-1 ${
                                    product.stock > 0 ? "text-green-400" : "text-red-500"
                                }`}
                            >
                                {product.stock > 0 ? `Stock: ${product.stock}` : "Sin stock"}
                            </p>

                            {/* Botones */}
                            <div className="flex flex-col space-y-3 w-full mt-4">
                                <button
                                    onClick={() => navigate(`/product/${product._id}`)}
                                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-all"
                                >
                                    Ver Más
                                </button>
                                <button
                                    onClick={() => addToCart(product._id, 1)}
                                    disabled={product.stock === 0}
                                    className={`w-full ${
                                        product.stock > 0
                                            ? "bg-green-600 hover:bg-green-700 text-white"
                                            : "bg-gray-600 text-gray-400 cursor-not-allowed"
                                    } py-2 px-4 rounded-lg transition-all`}
                                >
                                    {product.stock > 0 ? "Agregar al carrito" : "No disponible"}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Catalog;