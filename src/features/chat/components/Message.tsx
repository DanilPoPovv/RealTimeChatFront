import type { Message } from "../../../entities/chat/types"
import "./ChatComponents.css";
type messageProps = {
    message: Message;
    messageSender: string;
    messageDate : string;
}
export default function MessageComponent({ message, messageSender, messageDate}: messageProps) {
    return (
        <div className="messageBox">
            <div className="message">
                <div className="messageSender">
                    {messageSender}
                </div>
                {message.text}
                <div className="messageDate">{messageDate}</div>
            </div>
        </div>
    )
}