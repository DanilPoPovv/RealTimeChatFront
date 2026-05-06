import { useEffect, useRef } from "react";
import { signalRService } from "../../api/signalR/signalRService";
import type { Message } from "../../entities/chat/types";

export function useChatSignalR(
    messageUpdateCallback: (message: Message) => void) {
    const callbackRef = useRef(messageUpdateCallback);
    useEffect(() => {
    callbackRef.current = messageUpdateCallback;
}, [messageUpdateCallback]);
    useEffect(() => {

        async function init() {
            await signalRService.start();

            signalRService.offReceiveMessage();

            signalRService.onReceiveMessage((message) => {
                callbackRef.current(message);
            });
        }
        init();
        return () => {
            signalRService.offReceiveMessage();
        };
    }, []);
}