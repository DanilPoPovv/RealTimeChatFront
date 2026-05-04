import type { Message } from "../../entities/chat/types";
import  { apiFetch } from "../apiFetcher";

export function getChatMessages(chatId : number) {
    return apiFetch<Message[]>(`https://localhost:7110/api/messages/chat/${chatId}`, {
    method: "GET",
});
}


export function sendMessage(chatId : number, text : string) {
    console.log(1)
    return apiFetch<null>('https://localhost:7110/api/messages', {
        method: "POST",
        body : JSON.stringify({text, chatId})
    });
}