import type { Message } from "../../../entities/chat/types"
import "./ChatComponents.css";
type messageProps = {
    message : Message;
    messageSender : string;
}
export default function MessageComponent({message, messageSender} : messageProps ){
    return (
        <div className="messageBox">
        <div>{messageSender}</div>
        
        <div className="message">{message.text}</div>
        </div>
    )
}