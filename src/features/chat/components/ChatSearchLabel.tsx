
import "./styles/ChatList.css";
type ChatSearchLabelProps = {
    onChatSearchChange : (chatName : string) => void;
    onEnterKeyDown : (keyName : string) => void;
    onUserMenuOpen : () => void;
}
export default function ChatSearchLabel(chatSearchLabelProps : ChatSearchLabelProps){
    return(
        <div className="chatSearchLabel">
            <button className="menuButton" onClick={chatSearchLabelProps.onUserMenuOpen}>≡</button>
            <input className="chatSearchInput" 
            type="text" 
            placeholder="Поиска чата" 
            onChange={(e) => chatSearchLabelProps.onChatSearchChange(e.target.value)}
            onKeyDown={(e) => chatSearchLabelProps.onEnterKeyDown(e.key)}
            />
        </div>
    )
}