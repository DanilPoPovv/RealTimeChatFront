export async function apiFetch<T>(url : string, options?: RequestInit): Promise<T | void> {
    const res = await fetch(url, {
        headers : {
            "Content-Type": "application/json",
            ...(options?.headers || {})
        },
        ...options
    });

    if(!res.ok) {
        const errorData = await res.json().catch(() => null)

        throw new Error(
            errorData?.error || "Необработанная ошибка");
    }
    if(res.status == 204) {
         return undefined;
    }
    return res.json();
}