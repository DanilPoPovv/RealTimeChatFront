import { useEffect, useRef, useState } from "react";
import type { MessageEditModalProps } from "../../../entities/viewTypes";
import "./MessageContextMenu.css"
export default function MessageEditModal({
    messageText,
    messageId,
    chatId,
    messageEditCallback,
    onClose
}: MessageEditModalProps) {
    const messageEditRef = useRef<HTMLDivElement | null>(null);

    useEffect(()=> {
        function handleClickOutside(e : MouseEvent) {
            console.log(messageEditRef.current)
            console.log(e.target as Node)
            if(messageEditRef.current && !messageEditRef.current.contains(e.target as Node)){
                            console.log(1313213)
                onClose();
            }
        }
        document.addEventListener("mousedown",handleClickOutside);


        return () => {
            document.removeEventListener("mousedown",handleClickOutside)
        }
    },[])

    const [newMessageText, setNewMessageText] = useState(messageText);
    useEffect(() => {
    setNewMessageText(messageText);
}, [messageText]);
    return (
        <div className="messsageEditModal" ref={messageEditRef}>
            <input
                type="text"
                value={newMessageText}
                onChange={(e) => setNewMessageText(e.target.value)}
            />

            <button
                onClick={() =>
                    messageEditCallback(
                        messageId,
                        chatId,
                        newMessageText
                    )
                }
            >
                Изменить
            </button>
        </div>
    );
}