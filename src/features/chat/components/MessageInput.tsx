import "./styles/ChatWindow.css";
type MessageInputProps = {
    onInputMessageChange : (message : string) => void;
    onMessageSend : () => void;
    onEnterKeyDown : (keyName : string) => void;
    messageText : string;
}
export default function MessageInput(messageInputProps : MessageInputProps) {
    return (
        <div className="messageInputBox">
            <input className="messageInput" type="text" placeholder="Введите текст сообщения" 
            value={messageInputProps.messageText}
            onKeyDown={(e) => messageInputProps.onEnterKeyDown(e.key)}
            onChange={(e) => messageInputProps.onInputMessageChange(e.target.value)}/>
        </div>
    )
}