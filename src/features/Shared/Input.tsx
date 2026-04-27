import "./input.css";
type InputProps = {
    className? : string;
    value: string;
    onChange: (value: string) => void;
    placeHolder?: string;
    type?: "text" | "password" | "email" | "number";
}
export function Input({ className, value, onChange, placeHolder, type = "text" }: InputProps) {
    return (
        <div>
            <input 
                className={className}
                type={type}
                value={value}
                placeholder={placeHolder}
                onChange={e => onChange(e.target.value)}
            />
        </div>
    );
}