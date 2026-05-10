import type { Message } from "../../../entities/chat/domainTypes"
import "./styles/ChatWindow.css"
import type { MessageActionState } from "../../../entities/viewTypes"
type messageProps = {
    message: Message;
    messageSender: string;
    messageDate: string;
    onMessageRightClick: (contextMenuState: MessageActionState) => void
}
export default function MessageComponent({ message, messageSender, messageDate, onMessageRightClick }: messageProps) {
    return (
        <div className="messageBox">
            <div className="message" onContextMenu={(e) => {
                e.preventDefault();

                onMessageRightClick({
                    type: "context",
                    chatId: message.chatId,
                    messageId: message.id,
                    x: e.pageX,
                    y: e.pageY,
                    messageText: message.text
                });
            }}>
                <div className="messageSender">
                    {messageSender}
                </div>
                {message.text}
                <div className="messageDate">{messageDate}</div>
            </div>
        </div>
    )
}