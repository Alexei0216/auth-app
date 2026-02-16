let isRefreshing = false;
let refreshPromise = null;

export class ApiError extends Error {
    constructor(message, status, body = null) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.body = body;
    }
}

async function parseResponseBody(response) {
    const contentType = response.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
        return response.json();
    }
    return response.text();
}

async function refreshToken() {
    if (!isRefreshing) {
        isRefreshing = true;

        refreshPromise = fetch("http://localhost:5000/api/auth/refresh", {
            method: "POST",
            credentials: "include",
        }).then(async (res) => {
            if (!res.ok) {
                let body = null;
                try {
                    body = await parseResponseBody(res);
                } catch (_) { }
                throw new ApiError("Refresh failed", res.status, body);
            }
            return res.json();
        }).finally(() => {
            isRefreshing = false;
        });
    }

    return refreshPromise;
}

function shouldSkipRefresh(url) {
    return url.includes("/api/auth/refresh") || url.includes("/api/auth/login") || url.includes("/api/auth/register");
}

export async function apiFetch(url, options = {}) {
    const response = await fetch(url, {
        ...options,
        credentials: "include",
    });

    if (response.status !== 401 || shouldSkipRefresh(url)) {
        if (!response.ok) {
            let body = null;
            try {
                body = await parseResponseBody(response);
            } catch (_) { }
            const message = body?.message || `Request failed with status ${response.status}`;
            throw new ApiError(message, response.status, body);
        }
        return response;
    }

    try {
        await refreshToken();

        const retryResponse = await fetch(url, {
            ...options,
            credentials: "include",
        });

        if (!retryResponse.ok) {
            let body = null;
            try {
                body = await parseResponseBody(retryResponse);
            } catch (_) { }
            const message = body?.message || `Request failed with status ${retryResponse.status}`;
            throw new ApiError(message, retryResponse.status, body);
        }

        return retryResponse;
    } catch (err) {
        if (window.location.pathname !== "/login") {
            window.location.replace("/login");
        }
        throw err;
    }
}
