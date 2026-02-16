export async function login(data) {
    const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
    });

    const contentType = res.headers.get("content-type") || "";
    const body = contentType.includes("application/json") ? await res.json() : await res.text();

    if (!res.ok) {
        const message = body?.message || (typeof body === "string" ? body : "Login failed");
        throw new Error(message);
    }

    return body;
}