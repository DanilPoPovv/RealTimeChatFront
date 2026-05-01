import "./styles/ChatWindow.css";
export default function MessageInput() {
    return (
        <div className="messageInputBox">
            <input className="messageInput" type="text" placeholder="Введите текст сообщения" />
        </div>
    )
}