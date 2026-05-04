import "./styles/ChatWindow.css";
type MessageInputProps = {
    onInputMessageChange : (message : string) => void;
    onMessageSend : () => void;
    onEnterKeyDown : (keyName : string) => void;
}
export default function MessageInput(messageInputProps : MessageInputProps) {
    return (
        <div className="messageInputBox">
            <input className="messageInput" type="text" placeholder="Введите текст сообщения" 
            onKeyDown={(e) => messageInputProps.onEnterKeyDown(e.key)}
            onChange={(e) => messageInputProps.onInputMessageChange(e.target.value)}/>
        </div>
    )
}