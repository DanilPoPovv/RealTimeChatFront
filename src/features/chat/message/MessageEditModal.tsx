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
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
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
    useEffect(() => {
    if (textAreaRef.current) {

        textAreaRef.current.style.height =
            `${textAreaRef.current.scrollHeight}px`;
    }
}, [newMessageText]);
    return createPortal(
        <div className="messageEditModal centeredModal" ref={messageEditRef}>
            <textarea
                ref={textAreaRef}
                value={newMessageText}
                onChange={(e) => {
                    setNewMessageText(e.target.value);

                    e.target.style.height = `${e.target.scrollHeight}px`;
                }}
                rows={1}
                className="messageEditInput"
            />
            <button
                onClick={() => {
                    messageEditCallback(
                        messageId,
                        newMessageText
                    );
                    onClose();
                }}
            >
                Изменить
            </button>
        </div>
        , document.body);
}