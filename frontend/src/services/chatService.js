import io from 'socket.io-client';
const appURL = import.meta.env.VITE_BACK_URL
class ChatService {
  constructor() {
    this.socket = null;
    this.listeners = new Map();
  }

  connect(url = appURL) {
    if (this.socket) return;
    
    this.socket = io.connect(url);
    console.log('Socket connected');
    
    this.listeners.forEach((callback, event) => {
      this.socket.on(event, callback);
    });
  }

  disconnect() {
    if (!this.socket) return;
    
    this.socket.disconnect();
    this.socket = null;
    console.log('Socket disconnected');
  }

  sendMessage(messageData) {
    if (!this.socket) {
      console.error('Socket not connected');
      return false;
    }
    
    this.socket.emit('send_message', messageData);
    return true;
  }

  on(event, callback) {
    this.listeners.set(event, callback);
    
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  off(event) {
    if (this.socket) {
      this.socket.off(event);
    }
    
    this.listeners.delete(event);
  }

  isConnected() {
    return this.socket && this.socket.connected;
  }
}

const chatService = new ChatService();

export default chatService;