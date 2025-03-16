export interface ChatMessage {
  message: string;
  sender: string;
  timestamp: string;
  socketId?: string;
  context?: any;
}

export interface MessageRequest {
  message: string;
  context?: any;
}
