import { createContext, useContext, useEffect, useState } from "react";
import { apiFetch } from "../api/apiFetch";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function checkAuth() {
            try {
                const res = await apiFetch("http://localhost:5000/api/auth/me");

                if (res.ok) {
                    const data = await res.json();
                    setUser(data.user);
                } else {
                    setUser(null);
                }
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        }

        checkAuth();
    }, []);

    async function login(email, password) {
        const res = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || "Login failed");
        }

        const data = await res.json();
        setUser(data.user);
    }

    async function logout() {
        await fetch("http://localhost:5000/api/auth/logout", {
            method: "POST",
            credentials: "include",
        });

        setUser(null);
    }

    async function registerUser(name, email, password) {
        const res = await fetch("http://localhost:5000/api/auth/register", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Registration failed");
        }

        setUser(data.user);

        return data;
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, registerUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
