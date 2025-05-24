import { useState, useEffect } from "react";
import { Product } from "../../types/product";
import { getAllProducts } from "../../api/productAPI";
import { API_BASE_URL } from "../../api/productAPI";
import axios from "axios";
import { toast } from "react-toastify";

const ProductManagement = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [image, setImage] = useState<File | null>(null);
    const [formData, setFormData] = useState<{
        name: string;
        price: number;
        stock: number;
        description: string;
    }>({
        name: "",
        price: 0,
        stock: 0,
        description: "", // Nuevo campo para descripción
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await getAllProducts();
            setProducts(response);
        } catch (error) {
            toast.error("Hubo un problema al obtener los productos. Intenta más tarde.");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteProduct = async (productId: string) => {
        try {
            const token = localStorage.getItem("token");

            await axios.delete(`${API_BASE_URL}/products/${productId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setProducts(products.filter((product) => product._id !== productId));
            toast.success("El producto ha sido eliminado correctamente.");
        } catch (error) {
            toast.error("Hubo un error al eliminar el producto.");
        }
    };

    const handleFormSubmit = async () => {
        setLoading(true);
        const productData = new FormData();
        productData.append("name", formData.name);
        productData.append("price", formData.price.toString());
        productData.append("stock", formData.stock.toString());
        productData.append("description", formData.description); // Añadir campo descripción
        if (image) {
            productData.append("image", image);
        }
        try {
            const token = localStorage.getItem("token");

            if (isEditing && selectedProduct) {
                await axios.put(`${API_BASE_URL}/products/${selectedProduct._id}`, productData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                toast.success("Producto actualizado correctamente.");
            } else {
                await axios.post(`${API_BASE_URL}/products`, productData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                toast.success("Producto creado correctamente.");
            }
            fetchProducts();
            setFormData({ name: "", price: 0, stock: 0, description: "" });
            setIsEditing(false);
            setSelectedProduct(null);
        } catch (error) {
            toast.error("Hubo un error al crear o actualizar el producto.");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (product: Product) => {
        setSelectedProduct(product);
        setFormData({
            name: product.name,
            price: product.price,
            stock: product.stock,
            description: product.description, // Cargar la descripción existente
        });
        setIsEditing(true);
    };

    return (
        <div className="p-6 bg-black rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4">Gestión de Productos</h1>
            <div className="mb-4">
                <button
                    onClick={() => setIsEditing(true)}
                    className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md"
                >
                    Añadir Producto
                </button>
            </div>

            {loading ? (
                <p>Cargando...</p>
            ) : (
                <table className="min-w-full table-auto">
                    <thead>
                    <tr>
                        <th className="px-4 py-2 border">Nombre</th>
                        <th className="px-4 py-2 border">Precio</th>
                        <th className="px-4 py-2 border">Stock</th>
                        <th className="px-4 py-2 border">Descripción</th>
                        <th className="px-4 py-2 border">Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((product) => (
                        <tr key={product._id}>
                            <td className="px-4 py-2 border">{product.name}</td>
                            <td className="px-4 py-2 border">{product.price}</td>
                            <td className="px-4 py-2 border">{product.stock}</td>
                            <td className="px-4 py-2 border">{product.description}</td>
                            <td className="px-4 py-2 border">
                                <button
                                    onClick={() => handleEdit(product)}
                                    className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-md"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleDeleteProduct(product._id)}
                                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md ml-2"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

            {isEditing && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-semibold mb-4">
                            {selectedProduct ? "Editar Producto" : "Nuevo Producto"}
                        </h2>
                        <form>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Nombre
                                </label>
                                <input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full mt-1 p-2 border bg-black rounded-md"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                    Precio
                                </label>
                                <input
                                    id="price"
                                    type="number"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                                    className="w-full mt-1 p-2 border bg-black rounded-md"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                                    Stock
                                </label>
                                <input
                                    id="stock"
                                    type="number"
                                    value={formData.stock}
                                    onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                                    className="w-full mt-1 p-2 border bg-black rounded-md"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                    Descripción
                                </label>
                                <textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full mt-1 p-2 border bg-black rounded-md"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                                    Imagen
                                </label>
                                <input
                                    id="image"
                                    type="file"
                                    onChange={(e) => e.target.files && setImage(e.target.files[0])}
                                    className="w-full mt-1 p-2 border bg-black rounded-md"
                                />
                            </div>
                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    onClick={handleFormSubmit}
                                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md"
                                >
                                    {isEditing ? "Actualizar" : "Crear Producto"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductManagement;