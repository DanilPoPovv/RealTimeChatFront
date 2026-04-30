import "./ChatComponents.css"
import type { Message } from "../../../entities/chat/types"
import MessageComponent from "./Message"
type chatWindowProps = {
    messages : Message[];
}
export default function ChatWindow( {messages} : chatWindowProps){
function formatDate(date: string): string {
    const data = new Date(date);

    return data.toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit"
    });
}

    return ( 
    <div className="chatWindow">
        {messages && messages.map((m) => <MessageComponent 
        key={m.id} 
        message={m} 
        messageSender={m.user.name}
        messageDate={formatDate(m.createdAt)}/>)}
    </div>
    )
}