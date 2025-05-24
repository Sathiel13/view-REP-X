import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {useCart} from "../context/CartContext.tsx";


const Checkout: React.FC = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { cartItems, total } = useCart(); // Datos del carrito desde el contexto

    useEffect(() => {
        // Llamar al backend para obtener el Payment Intent
        const fetchPaymentIntent = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/create-payment-intent", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                const data = await response.json();
                setClientSecret(data.clientSecret);
            } catch (error) {
                console.error("Error obteniendo Payment Intent:", error);
                toast.error("Ocurrió un error obteniendo la información de pago.");
            }
        };

        fetchPaymentIntent();
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements || !clientSecret) return;

        setIsLoading(true);

        const cardElement = elements.getElement(CardElement);
        if (!cardElement) {
            setIsLoading(false);
            toast.error("Por favor ingresa la información de tu tarjeta.");
            return;
        }

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
            },
        });

        setIsLoading(false);

        if (result.error) {
            console.error("Error en el pago:", result.error.message);
            toast.error("Error procesando el pago. Intenta nuevamente.");
        } else {
            if (result.paymentIntent?.status === "succeeded") {
                toast.success("Pago exitoso. ¡Gracias por tu compra!");
                navigate("/order-success");
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="bg-white p-8 shadow-md rounded-md max-w-lg w-full">
                <h1 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
                    Completar Pago
                </h1>

                <div className="space-y-4 mb-6">
                    <h2 className="text-lg font-medium text-gray-600">Resumen del Pedido</h2>
                    <ul className="space-y-3">
                        {cartItems.map((item: { product: { _id: string; name: string; price: number }; quantity: number }) => (
                            <li key={item.product._id} className="flex justify-between items-center border-b pb-2">
                                <div>
                                    <p className="font-medium text-gray-800">{item.product.name}</p>
                                    <p className="text-sm text-gray-500">
                                        {item.quantity} x ${item.product.price.toFixed(2)}
                                    </p>
                                </div>
                                <span className="font-medium text-gray-800">
                                    ${(item.quantity * item.product.price).toFixed(2)}
                                </span>
                            </li>
                        ))}
                    </ul>
                    <div className="flex justify-between items-center text-lg font-medium text-gray-800 mt-4">
                        <span>Total a pagar:</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-gray-50 border border-gray-300 p-4 rounded-md transition focus-within:ring focus-within:ring-blue-400">
                        <CardElement
                            options={{
                                style: {
                                    base: {
                                        fontSize: "16px",
                                        color: "#333",
                                        "::placeholder": { color: "#888" },
                                    },
                                    invalid: { color: "#e63946" },
                                },
                            }}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={!stripe || isLoading}
                        className="w-full bg-blue-500 text-white py-3 font-medium rounded-md text-lg hover:bg-blue-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Procesando..." : "Pagar Ahora"}
                    </button>
                </form>
                <p className="text-sm text-gray-500 mt-4 text-center">
                    Tus datos de pago están protegidos.
                </p>
            </div>
        </div>
    );
};

export default Checkout;