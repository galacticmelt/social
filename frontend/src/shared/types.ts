export interface LogInData {
  email: string;
  password: string;
}

export interface SignUpData {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  email: string;
  password: string;
}

export type RawChat = {
  _id: string;
  users: {
    _id: string;
    firstName: string;
    lastName: string;
  }[];
  lastMessage: IncomingHistoryMessage;
};

export type User = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  friends: Friend[];
};

export type UserUpdate = {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: Date;
  location?: string;
  almaMater?: string;
};

export type PostData = {
  creator: string;
  text: string;
};

export type PostUpdate = {
  likedBy?: string[];
  text?: string;
};

export type Post = {
  _id: string;
  creator: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  text: string;
  likedBy: string[];
  createdAt: Date;
};

export type Friend = {
  _id: string;
  firstName: string;
  lastName: string;
};

export type IncomingHistoryMessage = {
  _id: string;
  sender: string;
  chatId: string;
  text: string;
  createdAt: string;
};

export interface OutcomingHistoryMessage {
  chatId: string;
  sender: string;
  text: string;
}
