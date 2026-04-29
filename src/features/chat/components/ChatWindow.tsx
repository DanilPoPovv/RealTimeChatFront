import "./ChatComponents.css"
import type { Message } from "../../../entities/chat/types"
import MessageComponent from "./Message"
type chatWindowProps = {
    messages : Message[];
}
export default function ChatWindow( {messages} : chatWindowProps){
    return ( 
    <div className="chatWindow">
        {messages && messages.map((m) => <MessageComponent key={m.id} message={m} messageSender={m.user.name}/>)}
    </div>
    )
}