import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginInputDataBox from "../features/auth/LoginInputDataBox";
import {loginRequest} from "../api/auth/login";
export function LoginPage() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<null | string>("");
    
    const navigate = useNavigate();
    async function handleSubmit(){
        try{
        setError(null);
        const response = await loginRequest(login,password);
        localStorage.setItem("token", response.token);

        navigate("/Chat")
        }
        catch(error){
            setError((error as Error).message);
        }
    }
    return (
        <div>
            <LoginInputDataBox
                loginValue={login}
                setLogin={setLogin}
                passwordValue={password}
                setPassword={setPassword}
                onSubmit={handleSubmit}
            />

            {error && <div>{error}</div>}
        </div>
    );
}