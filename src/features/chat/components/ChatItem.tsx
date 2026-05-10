import type { Chat } from "../../../entities/chat/domainTypes";
import "./styles/ChatList.css";
type ChatItemProps = {
    chat : Chat;
    chatId : number;
    onClick : (chatId : number) => Promise<void>;
    isSelected : boolean;
}
export default function ChatItem( {chat, onClick, chatId, isSelected} : ChatItemProps) {
    return (
        <div className={`chatItem ${isSelected ? "selected" : ""}`}
         onClick={() => onClick(chatId)}>
             {chat.name}</div>
    )
}