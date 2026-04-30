import type { Chat } from "../../../entities/chat/types";
import "./styles/ChatList.css";
type ChatItemProps = {
    chat : Chat;
    chatId : number;
    onClick : (chatId : number) => Promise<void>;
}
export default function ChatItem( {chat, onClick, chatId} : ChatItemProps) {
    return (
        <div className="chatItem" onClick={() => onClick(chatId)}>
             {chat.name}</div>
    )
}