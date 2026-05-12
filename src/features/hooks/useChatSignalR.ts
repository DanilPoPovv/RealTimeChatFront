import { useEffect, useRef } from "react";
import { signalRService } from "../../api/signalR/signalRService";
import type { Message, MessageDeleteEvent, MessageUpdateEvent } from "../../entities/chat/domainTypes";

export function useChatSignalR(
    messageReceiveCallback: (message: Message) => void,
    messageDeleteCallback: (message: MessageDeleteEvent) => void,
    messageUpdateCallback: (message: MessageUpdateEvent) => void) {
    const messageReceiveCallbackRef = useRef(messageReceiveCallback);
    const messageDeleteCallbackRef = useRef(messageDeleteCallback);
    const messageUpdateCallbackRef = useRef(messageUpdateCallback);
    useEffect(() => {
    messageReceiveCallbackRef.current = messageReceiveCallback;
    messageDeleteCallbackRef.current = messageDeleteCallback;
    messageUpdateCallbackRef.current = messageUpdateCallback;
}, [messageReceiveCallback, messageDeleteCallback, messageUpdateCallback]);

    useEffect(() => {

        async function init() {
            await signalRService.start();

            signalRService.offReceiveMessage();
            signalRService.offDeleteMessage();
            signalRService.offUpdateMessage();
            signalRService.onDeleteMessage((message) => {
                messageDeleteCallbackRef.current(message);
            })
            signalRService.onReceiveMessage((message) => {
                messageReceiveCallbackRef.current(message);
            });
            signalRService.onUpdateMessage((message) => {
                messageUpdateCallbackRef.current(message)
            })
        }
        init();
        return () => {
            signalRService.offReceiveMessage();
            signalRService.offDeleteMessage();
            signalRService.offUpdateMessage();
        };
    }, []);
}