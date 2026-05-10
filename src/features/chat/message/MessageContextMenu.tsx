import { createPortal } from "react-dom";
import type { MessageContextMenuProps } from "../../../entities/viewTypes";
import "./MessageContextMenu.css";
import { useEffect, useRef } from "react";

export default function MessageContextMenu({
    x,
    y,
    chatId,
    messageId,
    messageText,
    onEdit,
    onDelete,
    onClose
}: MessageContextMenuProps) {
    const contextMenuRef = useRef<HTMLDivElement | null>(null);

    useEffect(()=> {
        function handleClickOutside(e : MouseEvent) {
            if(contextMenuRef.current && !contextMenuRef.current.contains(e.target as Node)){
                onClose();
            }
        }
        document.addEventListener("mousedown",handleClickOutside);


        return () => {
            document.removeEventListener("mousedown",handleClickOutside)
        }
    },[])
    return createPortal(
        <div
            className="messageContextMenu"
            ref={contextMenuRef}
            style={{
                position: "absolute",
                top: y,
                left: x
            }}
        >
            <button onClick={() => onEdit(chatId, messageId, messageText)}>
                Обновить
            </button>

            <button onClick={() => onDelete(chatId, messageId)}>
                Удалить
            </button>
        </div>,
        document.body
    );
}