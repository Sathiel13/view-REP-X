import React from "react";
import { Link } from "react-router-dom";

const OrderSuccess: React.FC = () => {
    return (
        <div className="order-success">
            <h1>🎉 ¡Gracias por tu compra! 🎉</h1>
            <p>Tu pedido ha sido recibido y está siendo procesado.</p>
            <Link to="/catalog">Volver al Catálogo</Link>
        </div>
    );
};

export default OrderSuccess;