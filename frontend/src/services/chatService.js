import io from "socket.io-client";

class ChatService {
  constructor(appURL = import.meta.env.VITE_BACK_URL) {
    this.socket = null;
    this.appURL = appURL;
  }

  connect() {
    if (this.socket) return;

    this.socket = io.connect(`${this.appURL}/llm`);
    console.log("Socket connected");
  }

  disconnect() {
    if (!this.socket) return;

    this.socket.disconnect();
    this.socket = null;
    console.log("Socket disconnected");
  }

  sendMessage(messageData) {
    if (!this.socket) {
      console.error("Socket not connected");
      return false;
    }

    this.socket.emit("send_message", messageData);
    return true;
  }

  on(event, callback) {
    if (!this.socket) {
      console.error("Socket not connected, can't add listener");
      return;
    }

    this.socket.on(event, callback);
  }

  off(event) {
    if (!this.socket) return;

    this.socket.off(event);
  }

  isConnected() {
    return this.socket && this.socket.connected;
  }
}

const chatService = new ChatService();
export default chatService;
