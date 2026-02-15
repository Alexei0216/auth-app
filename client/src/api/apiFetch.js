let isRefreshing = false;
let refreshPromise = null;
let hasRedirected = false;

async function refreshToken() {
    if (!isRefreshing) {
        isRefreshing = true;

        refreshPromise = fetch("http://localhost:5000/api/auth/refresh", {
            method: "POST",
            credentials: "include",
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Refresh failed");
                }
                return res.json();
            })
            .finally(() => {
                isRefreshing = false;
            });
    }

    return refreshPromise;
}

export async function apiFetch(url, options = {}) {
    const response = await fetch(url, {
        ...options,
        credentials: "include",
    });

    if (response.status !== 401) {
        return response;
    }

    try {
        await refreshToken();

        return await fetch(url, {
            ...options,
            credentials: "include",
        });
    } catch (err) {
        if (!hasRedirected) {
            hasRedirected = true;
            window.location.href = "/login";
        }

        throw err;
    }
}
