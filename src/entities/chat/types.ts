export type Chat = {
    id : number;
    name : string;
}

export type Message = {
    id : number;
    createdAt : Date;
    text : string;
    user : {
        id: number;
        name: string;
    }
}