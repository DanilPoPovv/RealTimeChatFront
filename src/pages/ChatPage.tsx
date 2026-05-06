import ChatWindow from "../features/chat/components/ChatWindow"
import ChatList from "../features/chat/components/ChatList"
import { useEffect, useState } from "react"
import { signalRService } from "../api/signalR/signalRService";
import { useChats } from "../features/hooks/useChat";
import { useChatMessage } from "../features/hooks/useChatMessages";
import { useChatSignalR } from "../features/hooks/useChatSignalR";
import type { Message } from "../entities/chat/types";
export default function ChatPage() {
    const [chatId, serCurrentChatId] = useState<number | null>(null);
    const {chats,
        searchChatsHandler,
        chatSearchChangeHandler
        } = useChats();
    
    const {
        messages,
        setMessageText,
        loadChatMessages,
        sendChatMessage,
        addChatMessage
    } = useChatMessage();
    useChatSignalR((message : Message) => {
        if (message.chatId !== chatId)
            return;
        addChatMessage(message);
    });
    useEffect(() => {

    },[chatId])
    async function chatClickHandler(chatId: number) {

        await loadChatMessages(chatId)
        await signalRService.joinChat(chatId); 
        serCurrentChatId(chatId);
    }


    async function sendMessageEnterDown(keyName: string) {
        if ((keyName === "Enter")) {
            if (chatId) {
                await sendChatMessage(chatId)
             }
        }
    }

    async function searchChats(keyName:string) {
        if((keyName === "Enter")){
            await searchChatsHandler();
        }
    }
    return (
        <div style={{ display: "flex" }}>
            <ChatList chats={chats}
                selectedChatId={chatId}
                onChatClicked={chatClickHandler}
                onChatSearchChange={chatSearchChangeHandler}
                onChatSearhEnterDown={searchChats}
            />
            <ChatWindow
                messages={messages}
                onInputMessageChange={setMessageText}
                onMessageSend={() => {
                    if (chatId){
                         sendChatMessage(chatId)}
                }}
                onEnterKeyDown={sendMessageEnterDown}
            />
        </div>
    )
}