import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// Carga tu clave pública de Stripe (variable de entorno o hardcoded si es necesario)
const stripePromise = loadStripe("pk_test_51RK3Q9BIvyNH4MWQg8OE8YXRzAErM5alXZ4RtNcsC5cRBLzs3XeXqgKupZHeNCdvVY47Jlel1o8IRFb11u01xEPq008cTvTXZD"); // Reemplaza por tu clave pública

const StripeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <Elements stripe={stripePromise}>{children}</Elements>;
};

export default StripeProvider;