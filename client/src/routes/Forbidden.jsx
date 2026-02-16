import { useNavigate } from "react-router-dom";

export default function Forbidden() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
            <div className="max-w-md w-full bg-white rounded-xl shadow-md p-6 text-center">
                <h1 className="text-2xl font-bold text-gray-900">Acceso denegado</h1>
                <p className="text-gray-600 mt-3">
                    Tu cuenta no tiene permiso para ver esta pagina.
                </p>
                <div className="mt-6 flex gap-3 justify-center">
                    <button
                        onClick={() => navigate("/login", { replace: true })}
                        className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 cursor-pointer"
                    >
                        Ir a iniciar sesion
                    </button>
                </div>
            </div>
        </div>
    );
}
