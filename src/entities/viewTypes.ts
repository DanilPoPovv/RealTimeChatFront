export type MessageActionState =
    | {
        type: "context";
        chatId: number;
        messageId: number;
        x: number;
        y: number;
        messageText : string;
    }
    | {
        type: "edit";
        chatId: number;
        messageId: number;
        messageText : string;
    }
    | {
        type: "delete";
        chatId: number;
        messageId: number;
    }
    | null;

export type MessageContextMenuProps = {
    chatId : number,
    messageId : number,
    messageText : string,
    onEdit : (chatId : number, messageId : number, messageText : string) => void; 
    onDelete : (chatId : number, messageId : number) => void; 
}

export type MessageEditModalProps = {
    messageText: string;
    messageId: number;
    chatId: number;
    messageEditCallback: (
        messageId: number,
        chatId: number,
        messageText: string
    ) => void;
}