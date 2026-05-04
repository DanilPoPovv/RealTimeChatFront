import "./styles/ChatWindow.css"
import type { Message } from "../../../entities/chat/types"
import MessageComponent from "./Message"
import MessageInput from "./MessageInput"
import { useRef, useEffect } from "react"
type chatWindowProps = {
    messages : Message[];
    onMessageSend : () =>  void;
    onEnterKeyDown : (keyName : string) => void;
    onInputMessageChange : (message : string) => void;
}
export default function ChatWindow( {messages, onMessageSend, onEnterKeyDown, onInputMessageChange} : chatWindowProps){
const containerRef = useRef<HTMLDivElement | null>(null);

useEffect(() => {
    const el = containerRef.current;
    console.log(el);
    if (el) {
        el.scrollTop = el.scrollHeight;
        console.log(12333)
    }
}, [messages]);
function formatDate(date: string): string {
    const data = new Date(date);

    return data.toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit"
    });
}

    return ( 

    <div className="chatWindow">
        <div ref={containerRef} className="messageContainer">
        {messages && messages.map((m) => <MessageComponent 
        key={m.id} 
        message={m} 
        messageSender={m.user.name}
        messageDate={formatDate(m.createdAt)}/>)}
        </div>
        <MessageInput 
        onEnterKeyDown={onEnterKeyDown} 
        onMessageSend={onMessageSend}
        onInputMessageChange={onInputMessageChange} />
    </div>
    )
}