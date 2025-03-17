class BotResponse {
  public readonly message: string;
  public readonly context: any;
  public readonly timestamp: string;
  public readonly socketId: string;

  constructor(message: string, context: any, socketId: string) {
    this.message = message;
    this.context = context;
    this.timestamp = new Date().toISOString();
    this.socketId = socketId;
  }

  public toJSON() {
    return {
      message: this.message,
      context: this.context,
      timestamp: this.timestamp,
      socketId: this.socketId,
    };
  }
}

export { BotResponse };
