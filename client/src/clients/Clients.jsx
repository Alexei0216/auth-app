import MainLayout from "../layouts/MainLayout"
import { useEffect, useState } from "react"
import { apiFetch } from "../api/apiFetch";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import EditClientModal from "./EditClientModal";

export default function Clients() {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editClient, setEditClient] = useState(null)
    const { logout } = useAuth();
    const navigate = useNavigate();


    useEffect(() => {
        fetchClients()
    }, [])

    const fetchClients = async () => {
        try {
            setLoading(true)
            const response = await apiFetch("http://localhost:5000/api/clients");

            if (!response.ok) {
                throw new Error("Failed to fetch clients")
            }

            const data = await response.json()
            setClients(data)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id) => {
        try {
            const response = await apiFetch(
                `http://localhost:5000/api/clients/${id}`,
                {
                    method: "DELETE",
                }
            );

            if (!response.ok) {
                throw new Error("Failed to delete client");
            }

            setClients(prev => prev.filter(client => client.id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    const handleLogout = async () => {
        await logout();
        navigate("/login", { replace: true });
    };

    return (
        <MainLayout>
            <div className="min-h-screen bg-gray-50 py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-3xl font-bold">
                            Clients Dashboard
                        </h1>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 rounded-lg bg-gray-900 text-white cursor-pointer"
                        >
                            Logout
                        </button>
                    </div>

                    <div className="bg-white shadow-lg rounded-xl overflow-hidden">
                        <table className="min-w-full text-left">

                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="px-6 py-4">Name</th>
                                    <th className="px-6 py-4">Email</th>
                                    <th className="px-6 py-4">Role</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {loading && (
                                    <tr>
                                        <td colSpan="4" className="text-center py-8">
                                            Loading...
                                        </td>
                                    </tr>
                                )}

                                {error && (
                                    <tr>
                                        <td colSpan="4" className="text-center py-8 text-red-500">
                                            {error}
                                        </td>
                                    </tr>
                                )}

                                {!loading && !error && clients.map(client => (
                                    <tr key={client.id} className="border-b hover:bg-gray-50">
                                        <td className="px-6 py-4">{client.name}</td>
                                        <td className="px-6 py-4">{client.email}</td>
                                        <td className="px-6 py-4">{client.role}</td>
                                        <td className="px-6 py-4 text-right">
                                            <button onClick={() => {
                                                setEditClient(client)
                                            }}
                                                className="text-blue-600 hover:text-blue-800 mr-4"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(client.id)}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                                    {editClient && (
                                        <EditClientModal
                                            client={editClient}
                                            onClose={() => setEditClient(null)}
                                            onSave={async (updated) => {
                                                try {
                                                    const response = await apiFetch(
                                                        `http://localhost:5000/api/clients/${updated.id}`,
                                                        {
                                                            method: "PUT",
                                                            headers: {
                                                                "Content-Type": "application/json",
                                                            },
                                                            body: JSON.stringify({
                                                                name: updated.name,
                                                                email: updated.email,
                                                                role: updated.role,
                                                            }),
                                                        }
                                                    );

                                                    const data = await response.json();
                                                    setClients(prev => prev.map(c => c.id === data.id ? data : c));
                                                    setEditClient(null);
                                                } catch (err) {
                                                    console.error("Failed to save client", err);
                                                }
                                            }}
                                        />
                                    )}

                                {!loading && !error && clients.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="text-center py-8">
                                            No clients found
                                        </td>
                                    </tr>
                                )}
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}
