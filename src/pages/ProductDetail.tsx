// src/pages/ProductDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;

}

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error al obtener el producto', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                Cargando producto...
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                Producto no encontrado.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-10">
            <div className="max-w-5xl mx-auto bg-gray-800 rounded-2xl shadow-2xl p-8">

                <h1 className="text-4xl font-bold text-white mb-4">{product.name}</h1>
                <p className="text-2xl text-purple-400 mb-6">${product.price.toFixed(2)}</p>
                <p className="text-gray-300 mb-10">{product.description}</p>
                <Link
                    to="/catalog"
                    className="inline-block bg-purple-700 hover:bg-purple-800 text-white py-2 px-6 rounded-lg transition-colors"
                >
                    Volver al catálogo
                </Link>
            </div>
        </div>
    );
};

export default ProductDetail;
