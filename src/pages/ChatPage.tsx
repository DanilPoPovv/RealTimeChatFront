import ChatWindow from "../features/chat/components/ChatWindow"
import ChatList from "../features/chat/components/ChatList"
import MessageContextMenu from "../features/chat/message/MessageContextMenu";
import { useState } from "react"
import { signalRService } from "../api/signalR/signalRService";
import { useChats } from "../features/hooks/useChat";
import { useChatMessage } from "../features/hooks/useChatMessages";
import { useChatSignalR } from "../features/hooks/useChatSignalR";
import { useMessageContextMenu } from "../features/chat/message/UseMessageContextMenu";
import MessageEditModal from "../features/chat/message/MessageEditModal";
import MessageDeleteModal from "../features/chat/message/MessageDeleteModal";
export default function ChatPage() {
    const [chatId, serCurrentChatId] = useState<number | null>(null);

    const { chats,
        searchChatsHandler,
        chatSearchChangeHandler
    } = useChats();

    const {
        messages,
        setMessageText,
        loadChatMessages,
        sendChatMessage,
        updateMessages,
        deleteMessage,
        updateChatMessage,
        messageText
    } = useChatMessage();

    const {
        messageContextMenu,
        setMessageContextMenu
    } = useMessageContextMenu();
   useChatSignalR(

    (message) => {

        if (message.chatId !== chatId)
            return;

        updateMessages(prev => [
            ...prev,
            message
        ]);
    },

    (message) => {
        updateMessages(prev =>
            prev.filter(x => x.id !== message.messageId)
        );
    },
    (message) => {
        updateMessages(prev =>
            prev.map(m => 
                m.id === message.messageId 
                ? {...m, text : message.message}
                : m
            )
        );
    }
);

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

    async function searchChats(keyName: string) {
        if ((keyName === "Enter")) {
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
            {messageContextMenu?.type === "context" && (
                <MessageContextMenu
                    {...messageContextMenu}
                    onEdit={() =>
                        setMessageContextMenu({
                            type: "edit",
                            chatId: messageContextMenu.chatId,
                            messageId: messageContextMenu.messageId,
                            messageText: messageContextMenu.messageText
                        })
                    }
                    onDelete={() => {
                        setMessageContextMenu({
                            type : "delete",
                            chatId: messageContextMenu.chatId,
                            messageId: messageContextMenu.messageId
                        })
                    }}
                    onClose={() => setMessageContextMenu(null)}
                />
            )}
            {messageContextMenu?.type === "edit" && (
                <MessageEditModal 
                {...messageContextMenu}
                messageEditCallback={async (messageId : number, messageText : string) => 
                    await updateChatMessage(messageId, messageText)}
                onClose={() => setMessageContextMenu(null)}/>
            )}
            {messageContextMenu?.type === "delete" && (
                <MessageDeleteModal 
                {...messageContextMenu}
                messageDeleteCallback={async () =>  await deleteMessage(messageContextMenu.messageId, messageContextMenu.chatId)}
                onClose={() => setMessageContextMenu(null)}/>
            )}
            <ChatWindow
                messageInputText={messageText}
                onMessageRightClick={setMessageContextMenu}
                messages={messages}
                onInputMessageChange={setMessageText}
                onMessageSend={() => {
                    if (chatId) {
                        sendChatMessage(chatId)
                    }
                }}
                onEnterKeyDown={sendMessageEnterDown}
            />
        </div>
    )
}