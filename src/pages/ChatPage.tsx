import ChatWindow from "../features/chat/components/ChatWindow"
import ChatList from "../features/chat/components/ChatList"
import { useEffect, useState } from "react"
import type { Chat } from "../entities/chat/types";
import { getUserChats, searchChats } from "../api/chat/chatRepository";
import type { Message } from "../entities/chat/types";
import { getChatMessages, sendMessage } from "../api/message/messageRepository";
import { signalRService } from "../api/signalR/signalRService";
export default function ChatPage() {
    const [currentChatId, serCurrentChatId] = useState<number | null>(null);
    const [currentChatMessage, setCurrentChatMessage] = useState<Message[]>([]);
    const [currentChatSearch, setCurrentChatSearch] = useState<string>("");
    const [messageInputText, setMessageInputText] = useState<string>("");
    const [chats, setChats] = useState<Chat[]>([]);
    useEffect(() => {
        getUserChats().then((data) => {
            setChats(data);
            subscribeAllChatEvents();
        })
    }, []);
    async function subscribeAllChatEvents(){
        await signalRService.start();
        signalRService.offReceiveMessage();
        await signalRService.onReceiveMessage((message) =>{
            setCurrentChatMessage(prev => [...prev, message])
        });
    }
    async function chatClickHandler(chatId: number) {
        setCurrentChatMessage(await getChatMessages(chatId));
        await signalRService.joinChat(chatId); 
        serCurrentChatId(chatId);
    }

    async function performSearch(keyName: string) {
        if (isKeyEnter(keyName) && currentChatSearch) {
            var searchedChats = await searchChats(currentChatSearch);
            setChats(searchedChats);
        }
    }

    async function sendMessageEnterDown(keyName: string) {
        if (isKeyEnter(keyName)) {
            if (currentChatId) {
                await sendMessage(currentChatId, messageInputText); 
                setMessageInputText("");
             }
        }
    }
    function isKeyEnter(keyName: string): boolean {
        if (keyName === "Enter")
            return true;
        return false;
    }
    async function chatSearchChangeHandler(chatName: string) {
        if (chatName === "") {
            ///TODO: Эту штуку надо мемоизировать по хорошему. и когда то убрать дублирование.
            getUserChats().then((data) => {
                setChats(data);
            })
            setCurrentChatSearch("");
        }
        else {
            setCurrentChatSearch(chatName)
        }
    }
    return (
        <div style={{ display: "flex" }}>
            <ChatList chats={chats}
                onChatClicked={chatClickHandler}
                onChatSearchChange={chatSearchChangeHandler}
                onChatSearhEnterDown={performSearch}
            />
            <ChatWindow
                messages={currentChatMessage}
                onInputMessageChange={setMessageInputText}
                onMessageSend={() => {
                    if (currentChatId)
                        sendMessage(currentChatId, messageInputText);
                }}
                onEnterKeyDown={sendMessageEnterDown}
            />
        </div>
    )
}