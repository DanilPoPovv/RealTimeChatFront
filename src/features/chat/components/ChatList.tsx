import type{ Chat } from "../../../entities/chat/types"
import ChatItem from "./ChatItem"
import "./ChatComponents.css";
type ChatListProps = {
    chats : Chat[];
    onChatClicked : (chatId : number) => Promise<void>;
}
export default function ChatList(chatListProps : ChatListProps){
    return (
    <div className="chatList">
        {chatListProps.chats.map(
            (c) => 
            <ChatItem 
            key={c.id} 
            chat={c}
            chatId={c.id}
            onClick={chatListProps.onChatClicked}/>)}
    </div>
    )
}