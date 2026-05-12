import type { Message } from "../../entities/chat/domainTypes";
import { useState } from "react";
import { getChatMessages, sendMessage, deleteMessage, updateMessage } from "../../api/message/messageRepository";
export function useChatMessage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [messageText, setMessageText] = useState<string>("");
    async function loadChatMessages(chatId: number) {
        setMessages((await getChatMessages(chatId)).data);
    }

    async function sendChatMessage(chatId: number) {
        if (messageText) {
            await sendMessage(chatId, messageText)
            setMessageText("");
        }
    }

    function addChatMessage(message: Message) {
        setMessages((prev) => [...prev, message]);
    }

    function updateMessages(
        updater: (messages: Message[]) => Message[]
    ) {
        setMessages(updater);
    }
    async function deleteChatMessage(messageId : number, chatId : number){
        deleteMessage(chatId,messageId);
    }
    async function updateChatMessage(messageId : number, text : string) {
        console.log(messageId, text);
        updateMessage(messageId, text);
    }
    return {
        messages,
        setMessageText,
        loadChatMessages,
        sendChatMessage,
        setMessages,
        addChatMessage,
        deleteMessage: deleteChatMessage,
        updateMessages,
        updateChatMessage
    }
}