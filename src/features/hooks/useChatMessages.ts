import type { Message } from "../../entities/chat/domainTypes";
import { useRef, useState } from "react";
import { getChatMessages, sendMessage, deleteMessage, updateMessage } from "../../api/message/messageRepository";
export function useChatMessage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [messageText, setMessageText] = useState<string>("");
    const [hasMore, setHasMore] = useState(true);
    const isLoadingMoreRef = useRef<boolean>(false);
    ///TODO : Когда будет не лень вынести некоторые функции в отдельные хуки
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
    async function deleteChatMessage(messageId: number, chatId: number) {
        deleteMessage(chatId, messageId);
    }
    async function updateChatMessage(messageId: number, text: string) {
        console.log(messageId, text);
        updateMessage(messageId, text);
    }
    async function loadMoreMessages(chatId: number) {
        if (!hasMore || isLoadingMoreRef.current) return;
        isLoadingMoreRef.current = true;
        const oldestMessageId = messages.length > 0 ? messages[0].id : null;
        const moreMessage = (await getChatMessages(chatId, oldestMessageId)).data
        if (moreMessage.length === 0) {
            isLoadingMoreRef.current = false;
            setHasMore(false)
            return;
        }
        setMessages(prev => [
            ...moreMessage,
            ...prev
        ]);
        isLoadingMoreRef.current = false;
    }
    return {
        messages,
        messageText,
        setMessageText,
        loadChatMessages,
        sendChatMessage,
        setMessages,
        addChatMessage,
        deleteMessage: deleteChatMessage,
        updateMessages,
        updateChatMessage,
        loadMoreMessages
    }
}