import  { apiFetch } from "../apiFetcher";

type LoginResponse = 
{
    token : string;
}
export function loginRequest(login : string, password :string){
    return apiFetch<LoginResponse>("https://localhost:7110/api/auth/login", {
        method : "POST",
        body : JSON.stringify({login, password})
    });
}