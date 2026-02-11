import MainLayout from "../layouts/MainLayout"
import { useEffect, useState } from "react"

export default function Clients() {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchClients()
    }, [])

    const fetchClients = async () => {
        try {
            setLoading(true)
            const response = await fetch("http://localhost:5000/api/clients", {
                credentials: "include"
            })

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
            await fetch(`http://localhost:5000/api/clients/${id}`, {
                method: "DELETE",
                credentials: "include"
            })

            setClients(prev => prev.filter(client => client.id !== id))
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <MainLayout>
            <div className="min-h-screen bg-gray-50 py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8">
                        Clients Dashboard
                    </h1>

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
                                            <button
                                                onClick={() => handleDelete(client.id)}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}

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