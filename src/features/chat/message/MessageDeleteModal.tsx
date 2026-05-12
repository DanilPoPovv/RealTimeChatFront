import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { MessageDeleteModalProps } from "../../../entities/viewTypes";
import "./MessageContextMenu.css"
export default function MessageDeleteModal({
    messageId,
    chatId,
    messageDeleteCallback,
    onClose
}: MessageDeleteModalProps) {
    const messageDeleteRef = useRef<HTMLDivElement | null>(null);
    function handleClickOutside(e : MouseEvent) {
            if(messageDeleteRef.current && !messageDeleteRef.current.contains(e.target as Node)){
                onClose();
            }
        }
    useEffect(()=> {
        
        document.addEventListener("mousedown",handleClickOutside);


        return () => {
            document.removeEventListener("mousedown",handleClickOutside)
        }
    },[])

    return createPortal(
        <div className="messsageEditModal" ref={messageDeleteRef}>
            <button onClick={() => { 
                messageDeleteCallback(messageId, chatId)
                onClose();
            }}>Да</button>
            <button onClick={() => {
                onClose();
                document.removeEventListener("mousedown",handleClickOutside);
            }}>Нет</button>
        </div>
    , document.body);
}