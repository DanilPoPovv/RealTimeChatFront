import type { Message } from "../../entities/chat/domainTypes";
import  { apiFetch } from "../apiFetcher";

export function getChatMessages(chatId : number, beforeMessageId : number | null = null) {
    var baseUrl = `https://localhost:7110/api/messages/chat/${chatId}?limit=100`
    if (beforeMessageId){
        baseUrl = baseUrl + `&beforeMessageId=${beforeMessageId}`
    }
    return apiFetch<Message[]>(baseUrl, {
    method: "GET",
});
}


export function sendMessage(chatId : number, text : string) {
    return apiFetch<null>('https://localhost:7110/api/messages', {
        method: "POST",
        body : JSON.stringify({text, chatId})
    });
}

export function deleteMessage(chatId : number, messageId : number){
    return apiFetch<null>('https://localhost:7110/api/messages', {
        method: "DELETE",
        body : JSON.stringify({chatId, messageId})
    })
}
export function updateMessage(messageId : number, text : string) {
        return apiFetch<null>('https://localhost:7110/api/messages', {
        method: "PUT",
        body : JSON.stringify({messageId, text})
    })
}