import type { Message } from "../../entities/chat/domainTypes";
import  { apiFetch } from "../apiFetcher";

export function getChatMessages(chatId : number) {
    return apiFetch<Message[]>(`https://localhost:7110/api/messages/chat/${chatId}`, {
    method: "GET",
});
}


export function sendMessage(chatId : number, text : string) {
    return apiFetch<null>('https://localhost:7110/api/messages', {
        method: "POST",
        body : JSON.stringify({text, chatId})
    });
}