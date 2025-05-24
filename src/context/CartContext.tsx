import React, { createContext, useContext, useState, useEffect } from "react";
import { getCartAPI, addToCartAPI, removeFromCartAPI, clearCartAPI } from "../api/cartAPI";

interface CartItem {
    product: {
        _id: string;
        name: string;
        price: number;
        image?: string;
        description?: string;
    };
    quantity: number;
}

interface CartContextType {
    cartItems: CartItem[];
    total: number;
    totalItems: number; // Total de productos en el carrito
    fetchCart: () => Promise<void>;
    addToCart: (productId: string, quantity: number) => Promise<void>;
    removeFromCart: (productId: string) => Promise<void>;
    clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [total, setTotal] = useState<number>(0);

    // Calcular el número total de productos en el carrito
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    // Obtener el carrito desde la API al cargar la aplicación
    const fetchCart = async () => {
        try {
            const cart = await getCartAPI();
            setCartItems(cart.items || []); // Evitar problemas en caso de que `items` sea null/undefined
            setTotal(cart.total || 0); // Proteger contra valores no definidos
        } catch (error) {
            console.error("Error al obtener el carrito:", error);
        }
    };

    // Agregar un producto al carrito
    const addToCart = async (productId: string, quantity: number) => {
        try {
            const cart = await addToCartAPI(productId, quantity);
            setCartItems(cart.items || []); // Asegurar que el carrito esté en un formato manejable
            setTotal(cart.total || 0); // Asegurar que se actualice el total
        } catch (error) {
            console.error("Error al agregar producto al carrito:", error);
        }
    };

    // Eliminar un producto del carrito
    const removeFromCart = async (productId: string) => {
        try {
            const cart = await removeFromCartAPI(productId);
            setCartItems(cart.items || []);
            setTotal(cart.total || 0);
        } catch (error) {
            console.error("Error al eliminar producto del carrito:", error);
        }
    };

    // Vaciar el carrito completamente
    const clearCart = async () => {
        try {
            const cart = await clearCartAPI();
            setCartItems(cart.items || []);
            setTotal(cart.total || 0);
        } catch (error) {
            console.error("Error al vaciar el carrito:", error);
        }
    };

    // Llamar a fetchCart cuando se monta el proveedor para inicializar el estado
    useEffect(() => {
        fetchCart();
    }, []);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                total,
                totalItems,
                fetchCart,
                addToCart,
                removeFromCart,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart debe usarse dentro de un CartProvider");
    }
    return context;
};