import * as signalR from "@microsoft/signalr";
import type { Message, MessageDeleteEvent, MessageUpdateEvent } from "../../entities/chat/domainTypes";

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
  onDeleteMessage(callback: (messageDeleteEvent: MessageDeleteEvent) => void) {
    this.connection.on("DeleteMessage", callback);
  }
  offDeleteMessage() {
    this.connection.off("DeleteMessage");
  }
  onUpdateMessage(callback : (messageUpdateEvent : MessageUpdateEvent) => void) {
    this.connection.on("UpdateMessage",callback);
  }
  offUpdateMessage(){
    this.connection.off("UpdateMessage");
  }
}

export const signalRService = new SignalRService();