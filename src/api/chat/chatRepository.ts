import  { apiFetch } from "../apiFetcher";
import type { Chat } from "../../entities/chat/types";

type GetUserChatsResponse = {
    chats : Chat[];
};

export function getUserChats() {
    return apiFetch<GetUserChatsResponse>("https://localhost:7110/api/chats", {
        method: "GET",
    });
    
}