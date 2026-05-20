import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginInputDataBox from "../features/auth/LoginInputDataBox";
import {loginRequest} from "../api/auth/login";
import { useAuth } from "../features/Shared/context/AuthContext";
export function LoginPage() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<null | string>("");
    const {
            setCurrentUser,
            setToken
        } = useAuth();
    const navigate = useNavigate();
    async function handleSubmit(){
        try{
        setError(null);
        const response = await loginRequest(login,password);
        localStorage.setItem("token", response.data.token);
        setToken(response.data.token);
        setCurrentUser(response.data.userDto);
        navigate("/Chat")
        }
        catch(error){
            setError((error as Error).message);
            console.log(error);
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