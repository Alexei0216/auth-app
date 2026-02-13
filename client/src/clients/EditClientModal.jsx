import { useEffect, useState } from "react";

export default function EditClientModal({ client, onClose, onSave }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: ""
    });

    useEffect(() => {
        if (client) {
            setFormData({
                name: client.name,
                email: client.email,
                role: client.role
            });
        }
    }, [client]);
}