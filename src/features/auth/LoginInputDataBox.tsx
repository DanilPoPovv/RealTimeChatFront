import {Input} from "../Shared/Input"
import "./LoginInput.css"
type LoginInputProps = {
    loginValue: string;
    setLogin: (value: string) => void;
    passwordValue: string;
    setPassword: (value: string) => void;
    onSubmit : () => void;
}

export default function LoginInputDataBox(props: LoginInputProps) {
    return (
        <div className="page">
        <div className="dataBox">
            <Input 
                className="input"
                value={props.loginValue}
                placeHolder="Логин"
                onChange={props.setLogin}
            />
            <Input 
                className="input"
                value={props.passwordValue}
                placeHolder="Пароль"
                onChange={props.setPassword}
                type="password"
            />
            <button onClick={props.onSubmit} className="submitButton">
                Войти
            </button>
        </div>
        </div>
    );
}