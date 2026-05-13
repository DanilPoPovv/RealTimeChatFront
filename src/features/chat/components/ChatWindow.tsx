import "./styles/ChatWindow.css"
import type { Message } from "../../../entities/chat/domainTypes"
import MessageComponent from "./MessageComponent"
import MessageInput from "./MessageInput"
import { useRef, useEffect } from "react"
import type { MessageActionState } from "../../../entities/viewTypes"
type chatWindowProps = {
    messages: Message[];
    onMessageSend: () => void;
    onEnterKeyDown: (keyName: string) => void;
    onInputMessageChange: (message: string) => void;
    onMessageRightClick: (messageAction: MessageActionState) => void;
    messageInputText: string;
}
export default function ChatWindow({
    messages,
    onMessageSend,
    onEnterKeyDown,
    onInputMessageChange,
    onMessageRightClick,
    messageInputText }: chatWindowProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const el = containerRef.current;
        if (el) {
            el.scrollTop = el.scrollHeight;
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
                    onMessageRightClick={onMessageRightClick}
                    key={m.id}
                    message={m}
                    messageSender={m.user.name}
                    messageDate={formatDate(m.createdAt)} />)}
            </div>
            <MessageInput
                messageText={messageInputText}
                onEnterKeyDown={onEnterKeyDown}
                onMessageSend={onMessageSend}
                onInputMessageChange={onInputMessageChange} />
        </div>
    )
}