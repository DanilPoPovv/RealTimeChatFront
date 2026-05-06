import type{ Chat } from "../../../entities/chat/types"
import ChatItem from "./ChatItem"
import ChatSearchLabel from "./ChatSearchLabel";
import "./styles/ChatList.css";
type ChatListProps = {
    chats : Chat[];
    onChatClicked : (chatId : number) => Promise<void>;
    onChatSearchChange : (chatName : string) => void;
    onChatSearhEnterDown : (keyName : string) => void;
    selectedChatId : number | null ;
}
export default function ChatList(chatListProps : ChatListProps){
    return (
    <div className="chatList">
        <ChatSearchLabel 
        onChatSearchChange={chatListProps.onChatSearchChange}
        onEnterKeyDown={chatListProps.onChatSearhEnterDown}/>
        {chatListProps.chats.map(
            (c) => 
            <ChatItem 
            isSelected={c.id === chatListProps.selectedChatId}
            key={c.id} 
            chat={c}
            chatId={c.id}
            onClick={chatListProps.onChatClicked}/>)}
    </div>
    )
}