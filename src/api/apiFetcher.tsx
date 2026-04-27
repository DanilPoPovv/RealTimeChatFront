export async function apiFetch<T>(url : string, options?: RequestInit): Promise<T> {
    const token = localStorage.getItem("token");
    const res = await fetch(url, {
        headers : {
            "Content-Type": "application/json",
            ...(options?.headers || {}),
            ...(token ? {Authorization : `Bearer ${token}`} : {})
        },
        ...options
    });

    if(!res.ok) {
        const errorData = await res.json().catch(() => null)

        throw new Error(
            errorData?.error || "Необработанная ошибка");
    }
    return res.json();
}