export async function apiFetch<T>(url : string, options?: RequestInit): Promise<{data : T; status:number}> {
    const token = localStorage.getItem("token");
    const res = await fetch(url, {
        headers : {
            "Content-Type": "application/json",
            ...(options?.headers || {}),
            ...(token ? {Authorization : `Bearer ${token}`} : {})
        },
        ...options
    });
    const data = await res.json().catch(() => null)
    if(!res.ok) {

        throw new Error(
            data?.error || "Необработанная ошибка");
    }
    
    return {
        data, 
        status : res.status
    }
}