import "./styles/ChatWindow.css"
import type { Message } from "../../../entities/chat/domainTypes"
import MessageComponent from "./MessageComponent"
import MessageInput from "./MessageInput"
import { useRef, useEffect, useLayoutEffect } from "react"
import type { MessageActionState } from "../../../entities/viewTypes"
type chatWindowProps = {
    messages: Message[];
    onMessageSend: () => void;
    onEnterKeyDown: (keyName: string) => void;
    onInputMessageChange: (message: string) => void;
    onMessageRightClick: (messageAction: MessageActionState) => void;
    onLoadMoreMessage : () => Promise<void>;
    messageInputText: string;
    chatId : number | null;
}
export default function ChatWindow({
    messages,
    onMessageSend,
    onEnterKeyDown,
    onInputMessageChange,
    onMessageRightClick,
    messageInputText,
    onLoadMoreMessage,
    chatId}: chatWindowProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const prevScrollHeight = useRef(0);
    const isLoadingMore = useRef(false);
    const needRestoreScroll = useRef(false);
    useEffect(() => {
        const el = containerRef.current;
        if (el) {
            el.scrollTop = el.scrollHeight;
        }
    }, [chatId]);

    function formatDate(date: string): string {
        const data = new Date(date);

        return data.toLocaleTimeString("ru-RU", {
            hour: "2-digit",
            minute: "2-digit"
        });
    }
async function handleScroll() {
    const el = containerRef.current;
    if (!el) return;

    if (el.scrollTop > 100) return;
    if (isLoadingMore.current) return;

    isLoadingMore.current = true;

    prevScrollHeight.current = el.scrollHeight;

    needRestoreScroll.current = true;

    await onLoadMoreMessage();
}
useLayoutEffect(() =>{
    if(!needRestoreScroll.current) return;

    const el = containerRef.current;
    if(!el) return;

    const newScrollHeight = el.scrollHeight;

    el.scrollTop = newScrollHeight - prevScrollHeight.current;
    needRestoreScroll.current = false;
    isLoadingMore.current = false;
},[messages])
    return (

        <div className="chatWindow">
            <div ref={containerRef} className="messageContainer" onScroll={handleScroll}>
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