import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.tsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();
    const { login } = useContext(AuthContext)!;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', formData);
            const { token } = response.data;

            // Decodificar el payload del token
            const payload = JSON.parse(atob(token.split('.')[1]));
            const user = {
                id: payload.userId,
                name: payload.name || 'Usuario',
                role: payload.role,
            };

            // Guardar token y usuario en el contexto de autenticación
            login(token, user);

            // Notificación de éxito
            toast.success('Inicio de sesión exitoso', {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: 'dark',
            });

            // Redirigir después de un pequeño retraso
            setTimeout(() => {
                navigate('/home');
            }, 2500);

        } catch (error: any) {
            console.error('Error al iniciar sesión', error);

            // Mostrar mensajes basados en los diferentes errores
            if (error.response && error.response.status === 404) {
                toast.error('Email no registrado', {
                    position: 'top-right',
                    autoClose: 3000,
                    theme: 'dark',
                });
            } else if (error.response && error.response.status === 400) {
                toast.error('Contraseña incorrecta', {
                    position: 'top-right',
                    autoClose: 3000,
                    theme: 'dark',
                });
            } else {
                toast.error('Ocurrió un error. Inténtalo nuevamente.', {
                    position: 'top-right',
                    autoClose: 3000,
                    theme: 'dark',
                });
            }
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-950 text-white p-6"
            style={{
                backgroundColor: 'var(--dark-bg-primary)',
                backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(109, 40, 217, 0.15), transparent 70%)',
            }}
        >
            <ToastContainer />
            <div
                className="w-full max-w-md p-8 rounded-2xl shadow-2xl backdrop-blur-lg border border-opacity-20"
                style={{
                    backgroundColor: 'var(--dark-bg-secondary)',
                    borderColor: 'var(--dark-border)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 15px rgba(109, 40, 217, 0.2)',
                }}
            >
                <h1
                    className="text-3xl font-bold mb-6 text-center tracking-wide"
                    style={{
                        color: 'var(--dark-text-primary)',
                        textShadow: '0 0 10px rgba(109, 40, 217, 0.5)',
                    }}
                >
                    Iniciar Sesión en REP-X
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium"
                            style={{ color: 'var(--dark-text-secondary)' }}
                        >
                            Correo electrónico
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full p-3 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ease-in-out"
                            style={{
                                backgroundColor: 'var(--dark-input-bg)',
                                color: 'var(--dark-text-primary)',
                                borderColor: 'var(--dark-border)',
                                boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.3)',
                            }}
                            placeholder="tu@email.com"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium"
                            style={{ color: 'var(--dark-text-secondary)' }}
                        >
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full p-3 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ease-in-out"
                            style={{
                                backgroundColor: 'var(--dark-input-bg)',
                                color: 'var(--dark-text-primary)',
                                borderColor: 'var(--dark-border)',
                                boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.3)',
                            }}
                            placeholder="Tu contraseña"
                        />
                    </div>

                    <div className="flex justify-end">
                        <a
                            href="#"
                            className="text-sm hover:underline"
                            style={{ color: 'var(--dark-accent-primary)' }}
                        >
                            ¿Olvidaste tu contraseña?
                        </a>
                    </div>

                    <button
                        type="submit"
                        className="w-full p-3 rounded-lg font-semibold tracking-wide transition-all duration-300 ease-in-out transform hover:scale-[1.02]"
                        style={{
                            backgroundImage: 'linear-gradient(to right, var(--dark-accent-primary), var(--dark-accent-secondary))',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3), 0 0 10px rgba(109, 40, 217, 0.3)',
                        }}
                    >
                        Iniciar Sesión
                    </button>

                    <div className="text-center mt-4">
                        <p style={{ color: 'var(--dark-text-secondary)' }}>
                            ¿No tienes una cuenta?{' '}
                            <Link
                                to="/register"
                                className="hover:underline"
                                style={{ color: 'var(--dark-accent-primary)' }}
                            >
                                Regístrate
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
