import { useEffect,useRef,useState } from "react";
import type { Chat } from "../../entities/chat/types";
import { getUserChats, searchChats } from "../../api/chat/chatRepository";
export function useChats(){
    const [chats, setChats] = useState<Chat[]>([]);
    const [searchValue, setSearchValue] = useState("");

    useEffect(() =>{
        loadChats();
    }, [])
    async function loadChats() {
        const userChats = await getUserChats();
        setChats(userChats);
    }

    async function searchChatsHandler() {
        if(searchValue){
            setChats(await searchChats(searchValue));
            return;
        }
        loadChats();
    }

    async function chatSearchChangeHandler(chatName:string) {
        if(!chatName){
            await loadChats();
            return;
        }
        setSearchValue(chatName);
    }

    return {
        chats,
        searchValue,
        setSearchValue,
        loadChats,
        searchChatsHandler,
        chatSearchChangeHandler
    }
}