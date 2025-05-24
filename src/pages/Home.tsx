
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getRandomProducts } from "../api/productAPI.ts";
import { Product } from "../types/product.ts";
import { useCart } from "../context/CartContext"; // 👈 Importamos el contexto del carrito

const Home: React.FC = () => {
    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]); // Estado inicial vacío.
    const [loading, setLoading] = useState<boolean>(true); // Estado para determinar si está cargando.
    const [error, setError] = useState<string | null>(null); // Para guardar errores si ocurren.
    const { addToCart } = useCart(); // 👈 Usamos la función addToCart del contexto

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true); // Comienza la carga.
                const products = await getRandomProducts();
                if (Array.isArray(products)) {
                    setFeaturedProducts(products); // Guardar los productos si es un array.
                } else {
                    throw new Error("La respuesta de la API no es válida."); // Error si no es un array.
                }
            } catch (err: any) {
                console.error('Error al obtener productos destacados:', err);
                setError('Hubo un problema al cargar los productos destacados. Por favor, intenta más tarde.');
            } finally {
                setLoading(false); // Independientemente de lo que ocurra, detener la carga.
            }
        };

        fetchProducts();
    }, []);

    return (
        <div
            className="min-h-screen bg-gradient-to-b from-black to-gray-950 text-white"
            style={{
                backgroundColor: 'var(--dark-bg-primary)',
                backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(109, 40, 217, 0.15), transparent 70%)',
            }}
        >
            <Navbar />

            {/* Hero Section */}
            <section className="py-16 px-8 flex flex-col items-center text-center">
                <h1
                    className="text-5xl font-bold mb-6"
                    style={{
                        color: 'var(--dark-text-primary)',
                        textShadow: '0 0 15px rgba(109, 40, 217, 0.6)',
                    }}
                >
                    Bienvenido a REP-X
                </h1>
                <p className="text-xl mb-8 max-w-2xl" style={{ color: 'var(--dark-text-secondary)' }}>
                    Tu tienda de ropa deportiva con el mejor estilo
                </p>
                <button
                    className="px-8 py-3 rounded-lg font-semibold tracking-wide transition-all duration-300 ease-in-out transform hover:scale-[1.02]"
                    style={{
                        backgroundImage: 'linear-gradient(to right, var(--dark-accent-primary), var(--dark-accent-secondary))',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3), 0 0 10px rgba(109, 40, 217, 0.3)',
                    }}
                >
                    <Link to="/Catalog" className="py-2 px-6 text-white font-bold rounded-lg hover:bg-indigo-700">
                        Explorar productos
                    </Link>
                </button>
            </section>

            {/* Featured Products */}
            <section className="py-12 px-8">
                <h2
                    className="text-3xl font-bold mb-8 text-center"
                    style={{
                        color: 'var(--dark-text-primary)',
                    }}
                >
                    Productos Destacados
                </h2>

                {/* Mostrar mensajes adecuados según el estado */}
                {loading ? (
                    <p className="text-center text-xl">Cargando productos destacados...</p>
                ) : error ? (
                    <p className="text-center text-red-500 text-xl">{error}</p>
                ) : featuredProducts.length === 0 ? (
                    <p className="text-center text-xl">No hay productos destacados disponibles en este momento.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {featuredProducts.map(product => (
                            <div
                                key={product._id}
                                className="rounded-xl p-6 transition-transform duration-300 hover:scale-[1.03]"
                                style={{
                                    backgroundColor: 'var(--dark-bg-secondary)',
                                    borderColor: 'var(--dark-border)',
                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 0 6px rgba(109, 40, 217, 0.2)',
                                }}
                            >
                                {/* Imagen con fallback */}
                                <div
                                    className="h-40 bg-gray-700 rounded-lg mb-4 flex items-center justify-center"
                                    style={{
                                        backgroundColor: 'var(--dark-bg-tertiary)',
                                    }}
                                >
                                    <img
                                        src={product.image || 'https://via.placeholder.com/150'}
                                        alt={product.name || 'Producto sin nombre'}
                                        className="object-contain h-full"
                                    />
                                </div>
                                <h3
                                    className="text-xl font-semibold mb-2"
                                    style={{
                                        color: 'var(--dark-text-primary)',
                                    }}
                                >
                                    {product.name || 'Producto sin nombre'}
                                </h3>
                                <p
                                    className="text-sm mb-3"
                                    style={{
                                        color: 'var(--dark-text-secondary)',
                                    }}
                                >
                                    {product.description || 'Sin descripción disponible'}
                                </p>
                                <div className="flex justify-between items-center">
                                    <span
                                        className="text-lg font-bold"
                                        style={{
                                            color: 'var(--dark-accent-primary)',
                                        }}
                                    >
                                        ${product.price?.toFixed(2) || '0.00'}
                                    </span>
                                    <button
                                        onClick={() => addToCart(product._id, 1)} // 👈 Agregar al carrito con cantidad de 1
                                        className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
                                        style={{
                                            backgroundColor: 'var(--dark-accent-secondary)',
                                            color: 'var(--dark-text-primary)',
                                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                                        }}
                                    >
                                        Añadir
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Footer */}
            <footer
                className="py-8 px-8 mt-12 border-t text-center"
                style={{
                    borderColor: 'var(--dark-border)',
                    backgroundColor: 'rgba(30, 30, 30, 0.8)',
                }}
            >
                <p
                    style={{
                        color: 'var(--dark-text-secondary)',
                    }}
                >
                    © 2025 REP-X - Todos los derechos reservados By SATHCODE
                </p>
            </footer>
        </div>
    );
};

export default Home;