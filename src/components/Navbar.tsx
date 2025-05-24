import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Navbar = () => {
    const auth = useContext(AuthContext);
    const { totalItems } = useCart(); // Obtenemos el total de productos del carrito
    const role = auth?.user?.role;

    return (
        <header
            className="py-6 px-8 flex justify-between items-center border-b"
            style={{
                borderColor: "var(--dark-border)",
                backgroundColor: "rgba(30, 30, 30, 0.8)",
                backdropFilter: "blur(10px)",
            }}
        >
            <div
                className="text-2xl font-bold"
                style={{
                    color: "var(--dark-text-primary)",
                    textShadow: "0 0 10px rgba(109, 40, 217, 0.5)",
                }}
            >
                REP-X
            </div>
            <nav className="flex gap-6 items-center">


                {/* Mostrar si NO está autenticado */}
                {!auth?.isAuthenticated && (
                    <>
                        <Link to="/register" className="hover:text-purple-400 transition-colors duration-300">
                            Registro
                        </Link>
                        <Link to="/login" className="hover:text-purple-400 transition-colors duration-300">
                            Login
                        </Link>
                    </>
                )}

                {/* Mostrar si está autenticado */}
                {auth?.isAuthenticated && (
                    <>
                        <span className="text-sm text-purple-300">
                            Hola, <strong>{auth.user?.name}</strong>
                        </span>

                        {/* Mostrar solo si es ADMIN */}
                        {role === "admin" && (
                            <>
                                <Link to="/admin" className="hover:text-purple-400 transition-colors duration-300">
                                    Admin
                                </Link>
                                <Link to="/admin/products" className="hover:text-purple-400 transition-colors duration-300">
                                    Productos
                                </Link>
                            </>
                        )}

                        <button
                            onClick={auth.logout}
                            className="bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded text-white"
                        >
                            Cerrar sesión
                        </button>
                    </>
                )}

                <Link
                    to="/cart"
                    className="hover:text-purple-400 transition-colors duration-300 flex items-center relative"
                >
                    {/* Icono de carrito */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993
                              1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125
                              1.125 0 0 1-1.12-1.243l1.264-12A1.125
                              1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435
                              1.119 1.007ZM8.625 10.5a.375.375 0
                              1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5
                              0a.375.375 0 1 1-.75 0 .375.375 0
                              0 1 .75 0Z"
                        />
                    </svg>

                    {/* Mostrar burbuja si hay productos en el carrito */}
                    {totalItems > 0 && (
                        <span className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full text-sm w-5 h-5 flex items-center justify-center">
                            {totalItems}
                        </span>
                    )}
                </Link>
            </nav>
        </header>
    );
};

export default Navbar;