import { useEffect, useState } from "react";

export default function EditClientModal({ client, onClose, onSave }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        if (client) {
            setTimeout(() => {
                setFormData({
                    name: client.name,
                    email: client.email,
                    role: client.role
                });
            }, 0);
        }
    }, [client]);

    const handleSave = () => {
        if (onSave) onSave({ ...client, ...formData });
    };

    if (!client) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Edit Client</h2>

                <label className="block mb-2">
                    <span className="text-sm">Name</span>
                    <input name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full" />
                </label>

                <label className="block mb-2">
                    <span className="text-sm">Email</span>
                    <input name="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full" />
                </label>

                <label className="block mb-4">
                    <span className="text-sm">Role</span>
                    <input name="role" value={formData.role} onChange={handleChange} className="mt-1 block w-full" />
                </label>

                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="px-4 py-2">Cancel</button>
                    <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
                </div>
            </div>
        </div>
    );
}