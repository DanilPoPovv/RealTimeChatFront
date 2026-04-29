import type { Message } from "../../entities/chat/types";
import  { apiFetch } from "../apiFetcher";

export function getChatMessages(chatId : number) {
    return apiFetch<Message[]>(`https://localhost:7110/api/messages/chat/${chatId}`, {
    method: "GET",
});
}