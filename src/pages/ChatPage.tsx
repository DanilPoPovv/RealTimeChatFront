import ChatWindow from "../features/chat/components/ChatWindow"
import ChatList from "../features/chat/components/ChatList"
import { useEffect, useState } from "react"
import type { Chat } from "../entities/chat/types";
import { getUserChats } from "../api/chat/chatRepository";
export default function ChatPage(){
    const [chats,setChats] = useState<Chat[]>([]);
    useEffect(() =>{
        getUserChats().then((data) =>{
            setChats(data);
        })
    },[]);
    return(
        <div>
            <div>{JSON.stringify(chats)}</div>
            <ChatList/>
            <ChatWindow/>
        </div>
    )
}