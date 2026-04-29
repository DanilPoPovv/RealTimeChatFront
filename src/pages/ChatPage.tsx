import ChatWindow from "../features/chat/components/ChatWindow"
import ChatList from "../features/chat/components/ChatList"
import { useEffect, useState } from "react"
import type { Chat } from "../entities/chat/types";
import { getUserChats } from "../api/chat/chatRepository";
import type { Message } from "../entities/chat/types";
import { getChatMessages } from "../api/message/messageRepository";
export default function ChatPage(){
    const [chats,setChats] = useState<Chat[]>([]);
    useEffect(() =>{
        getUserChats().then((data) =>{
            setChats(data);
        })
    },[]);
    const [currentChatMessage,setCurrentChatMessage] = useState<Message[]>([]);
    async function chatClickHandler(chatId : number) {
        setCurrentChatMessage(await getChatMessages(chatId));
    }
    return(
        <div style={{display : "flex"}}>
            <ChatList chats={chats} onChatClicked={chatClickHandler}/>
            <ChatWindow messages={currentChatMessage}/>
        </div>
    )
}