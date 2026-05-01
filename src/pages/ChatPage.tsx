import ChatWindow from "../features/chat/components/ChatWindow"
import ChatList from "../features/chat/components/ChatList"
import { useEffect, useState } from "react"
import type { Chat } from "../entities/chat/types";
import { getUserChats, searchChats} from "../api/chat/chatRepository";
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

    const [currentChatSearch, setCurrentChatSearch] = useState<string>("");
    async function performSearch(keyName : string){
        if(keyName === "Enter" && currentChatSearch){
            var searchedChats = await searchChats(currentChatSearch);
            setChats(searchedChats);
        }
    }

    async function chatSearchChangeHandler(chatName:string) {
        if(chatName === ""){
            ///Эту штуку надо мемоизировать по хорошему. и когда то убрать дублирование.
        getUserChats().then((data) =>{
            setChats(data);
        })}
        else {
            setCurrentChatSearch(chatName)
        }
    }
    return(
        <div style={{display : "flex"}}>
            <ChatList chats={chats} 
            onChatClicked={chatClickHandler} 
            onChatSearchChange={chatSearchChangeHandler}
            onChatSearhEnterDown={performSearch}
            />
            <ChatWindow messages={currentChatMessage}/>
        </div>
    )
}