import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { MessageEditModalProps } from "../../../entities/viewTypes";
import "./MessageContextMenu.css"
export default function MessageEditModal({
    messageText,
    messageId,
    messageEditCallback,
    onClose
}: MessageEditModalProps) {
    const messageEditRef = useRef<HTMLDivElement | null>(null);
    function handleClickOutside(e: MouseEvent) {
        if (messageEditRef.current && !messageEditRef.current.contains(e.target as Node)) {
            onClose();
        }
    }
    useEffect(() => {

        document.addEventListener("mousedown", handleClickOutside);


        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    const [newMessageText, setNewMessageText] = useState(messageText);
    useEffect(() => {
        setNewMessageText(messageText);
    }, [messageText]);
    return createPortal(
        <div className="messsageEditModal" ref={messageEditRef}>
            <input
                type="text"
                value={newMessageText}
                onChange={(e) => setNewMessageText(e.target.value)}
            />

            <button
                onClick={() => {
                    messageEditCallback(
                        messageId,
                        newMessageText
                    );
                    onClose();
                    document.removeEventListener("mousedown", handleClickOutside);
                }}
            >
                Изменить
            </button>
        </div>
        , document.body);
}