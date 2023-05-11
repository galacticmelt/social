export type SocketState = {
  onlineUsers: SocketUser[];
  liveMessages: LiveMessage[];
};

export type SocketUser = {
  userId: string;
  socketId: string;
};

export type LiveMessage = {
  id: string;
  chatId: string;
  sender: string;
  text: string;
  createdAt: Date;
};
