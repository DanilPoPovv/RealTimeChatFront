import * as signalR from "@microsoft/signalr";
import type { Message } from "../../entities/chat/types";

class SignalRService {
  connection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:7110/chatHub")
    .withAutomaticReconnect()
    .build();

  async start() {
    if(this.connection.state !== "Disconnected"){
      return;
    }
    await this.connection.start();
  }
  offReceiveMessage(){
    this.connection.off("ReceiveMessage");
  }
  joinChat(chatId: number) {
    return this.connection.invoke("JoinChat", chatId);
  }

  leaveChat(chatId: number) {
    return this.connection.invoke("LeaveChat", chatId);
  }

  onReceiveMessage(callback: (message: Message) => void) {
    this.connection.on("ReceiveMessage", callback);
  }

}

export const signalRService = new SignalRService();