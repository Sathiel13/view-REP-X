import React, { useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

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
            const response = await axios.post('http://localhost:5000/api/auth/register', formData);
            console.log('Usuario registrado con éxito', response.data);

            // Notificación exitosa
            toast.success("Registro exitoso--Inicia Sesion en tu cuenta.", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "dark"
            });

            setTimeout(() => {
                window.location.href = "http://localhost:5174/login";
            }, 2500);

        } catch (error) {
            console.error('Error al registrar usuario', error);
            toast.error("Error al registrarte. Verifica tus datos.", {
                position: "top-right",
                autoClose: 3000,
                theme: "dark"
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-950 text-white p-6"
             style={{ backgroundColor: 'var(--dark-bg-primary)', backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(109, 40, 217, 0.15), transparent 70%)' }}>
            <ToastContainer />
            <div className="w-full max-w-md p-8 rounded-2xl shadow-2xl backdrop-blur-lg border border-opacity-20"
                 style={{
                     backgroundColor: 'var(--dark-bg-secondary)',
                     borderColor: 'var(--dark-border)',
                     boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 15px rgba(109, 40, 217, 0.2)'
                 }}>
                <h1 className="text-3xl font-bold mb-6 text-center tracking-wide"
                    style={{
                        color: 'var(--dark-text-primary)',
                        textShadow: '0 0 10px rgba(109, 40, 217, 0.5)'
                    }}>
                    Registrate a REP-X o nooo??
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium"
                               style={{ color: 'var(--dark-text-secondary)' }}>
                            Nombre de usuario
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full p-3 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ease-in-out"
                            style={{
                                backgroundColor: 'var(--dark-input-bg)',
                                color: 'var(--dark-text-primary)',
                                borderColor: 'var(--dark-border)',
                                boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.3)'
                            }}
                            placeholder="Tu nombre de usuario"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium"
                               style={{ color: 'var(--dark-text-secondary)' }}>
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
                                boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.3)'
                            }}
                            placeholder="tu@email.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium"
                               style={{ color: 'var(--dark-text-secondary)' }}>
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
                                boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.3)'
                            }}
                            placeholder="Tu contraseña"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full p-3 rounded-lg font-semibold tracking-wide transition-all duration-300 ease-in-out transform hover:scale-[1.02]"
                        style={{
                            backgroundImage: 'linear-gradient(to right, var(--dark-accent-primary), var(--dark-accent-secondary))',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3), 0 0 10px rgba(109, 40, 217, 0.3)'
                        }}
                    >
                        Registrar
                    </button>

                    <div className="text-center mt-4">
                        <p style={{ color: 'var(--dark-text-secondary)' }}>
                            ¿No te quieres registrar?{' '}
                            <Link to="/home" className="hover:underline" style={{ color: 'var(--dark-accent-primary)' }}>
                                Regresa a la tienda
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
