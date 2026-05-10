import { useState } from "react";
import type { MessageActionState} from "../../../entities/viewTypes";

export function useMessageContextMenu(){
    const [messageContextMenu, setMessageContextMenu] = useState<MessageActionState | null>(null);

    return {
        messageContextMenu,
        setMessageContextMenu
    }
}