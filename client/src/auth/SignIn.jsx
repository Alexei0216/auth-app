import { FaGoogle, FaFacebook, FaLinkedinIn } from "react-icons/fa";
import '../index.css'
import { useForm } from "react-hook-form";
import { useState } from "react";
import InputField from "./SignInComponents";
import MainLayout from "../layouts/MainLayout";

export default function SignIn() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [serverError, setServerError] = useState(null);

    const onSubmit = async (data) => {
        try {
            setServerError(null);

            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (!res.ok) {
                setServerError(result.message || "Login failed");
                return;
            }

            console.log("Logged user:", result.user);
        } catch (err) {
            setServerError("Server is not reachable");
        }
    };

    return (
        <MainLayout>
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="flex bg-white shadow-lg rounded-xl overflow-hidden max-w-4xl w-full">
                    <div className="flex flex-col justify-center items-center p-12 w-1/2 gap-6 bg-white">
                        <h1 className="text-black text-4xl font-bold pb-4">Iniciar sesión</h1>
                        <div className="flex flex-row gap-4">
                            <button className="p-3 border rounded-full cursor-pointer hover:bg-gray-100">
                                <FaGoogle />
                            </button>
                            <button className="p-3 border rounded-full cursor-pointer hover:bg-gray-100">
                                <FaFacebook />
                            </button>
                            <button className="p-3 border rounded-full cursor-pointer hover:bg-gray-100">
                                <FaLinkedinIn />
                            </button>
                        </div>

                        <form
                            className="flex flex-col gap-4 w-full max-w-sm"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <InputField
                                label="Introduce tu nombre"
                                type="text"
                                error={errors.name?.message}
                                {...register("name", {
                                    required: "Name is required",
                                    minLength: {
                                        value: 2,
                                        message: "Name must be at least 2 characters",
                                    },
                                })}
                            />
                            <InputField
                                label="Introduce tu correo electrónico"
                                type="email"
                                error={errors.email?.message}
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Invalid email address",
                                    },
                                })}
                            />
                            <InputField
                                label="Introduce tu contraseña"
                                type="password"
                                error={errors.password?.message}
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters",
                                    },
                                })}
                            />
                            <button className="btn-gradient mt-4 w-full rounded-xl">Iniciar sesión</button>
                        </form>
                        {serverError && (
                            <p className="text-red-600 text-sm text-center">{serverError}</p>
                        )}
                    </div>

                    <div className="bg-gradient flex flex-col justify-center items-center p-12 w-1/2 gap-6 text-center">
                        <h1 className="text-white text-4xl font-bold">¡Hola, amigo!</h1>
                        <p className="text-white text-lg mt-5">
                            Introduce tus datos personales y comienza tu viaje con nosotros
                        </p>
                        <button className="bg-white mt-15 px-8 py-3 rounded-xl font-bold shadow-lg cursor-pointer">
                            <span className="bg-gradient-to-r from-orange-400 via-red-500 to-yellow-500 
                                        bg-clip-text text-transparent animate-gradient-x">
                                Registrarse
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}