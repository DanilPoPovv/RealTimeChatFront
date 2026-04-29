import type { Chat } from "../../../entities/chat/types";
import "./ChatComponents.css";
type ChatItemProps = {
    chat : Chat;
    chatId : number;
    onClick : (chatId : number) => Promise<void>;
}
export default function ChatItem( {chat, onClick, chatId} : ChatItemProps) {
    return (
        <div className="chatItem" onClick={() => onClick(chatId)}>{chat.id}
             {chat.name}</div>
    )
}