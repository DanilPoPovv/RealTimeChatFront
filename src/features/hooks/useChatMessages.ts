import type { Message } from "../../entities/chat/types";
import { useState } from "react";
import { getChatMessages,sendMessage } from "../../api/message/messageRepository";
export function useChatMessage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [messageText, setMessageText] = useState<string>("");

    async function loadChatMessages(chatId : number) {
        setMessages(await getChatMessages(chatId));
    }

    async function sendChatMessage(chatId : number) {
        if(messageText){
            await sendMessage(chatId, messageText)
            setMessageText("");
        }
    }

    async function addChatMessage(message: Message) {
        console.log("1231")
        setMessages((prev) => [...prev, message]);
    }
    return {
        messages,
        setMessageText,
        loadChatMessages,
        sendChatMessage,
        setMessages,
        addChatMessage
    }
}