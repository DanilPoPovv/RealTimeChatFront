export type Chat = {
    id : number;
    name : string;
}

export type Message = {
    id : number;
    createdAt : string;
    text : string;
    chatId : number;
    user : {
        id: number;
        name: string;
    }
}