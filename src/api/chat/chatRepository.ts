import  { apiFetch } from "../apiFetcher";
import type { Chat } from "../../entities/chat/domainTypes";


export function getUserChats() {
    return apiFetch<Chat[]>("https://localhost:7110/api/chats/GetChatUser", {
        method: "GET",
    });
}

export function searchChats(chatName : string){
    return apiFetch<Chat[]>(`https://localhost:7110/api/chats/SearchChat?chatName=${chatName}`,
        {
            method : "Get",});

}