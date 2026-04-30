import { useState } from "react";
import "./styles/ChatList.css";
type ChatSearchLabelProps = {
    onChatSearchChange : (chatName : string) => void;
    onChatSearhEnterDown : (keyName : string) => void;
}
export default function ChatSearchLabel(chatSearchLabelProps : ChatSearchLabelProps){
    return(
        <div className="chatSearchLabel">
            <input className="chatSearchInput" 
            type="text" 
            placeholder="Поиска чата" 
            onChange={(e) => chatSearchLabelProps.onChatSearchChange(e.target.value)}
            onKeyDown={(e) => chatSearchLabelProps.onChatSearhEnterDown(e.key)}
            />
        </div>
    )
}