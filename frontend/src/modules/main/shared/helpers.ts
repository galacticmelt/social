import dayjs from 'dayjs';
import { parse, v4 as uuid } from 'uuid';
import { SocketUser, LiveMessage } from '../../../store/features/socket/socket.types';
import { IncomingHistoryMessage } from '../../../store/features/currentChat/currentChat.types';

export const createSocketMessage = (
  onlineUsers: SocketUser[],
  chatId: string,
  companionId: string,
  loggedUserId: string,
  messageText: string
) => {
  const companionOnline = onlineUsers.find((user) => user.userId === companionId);
  const socketMessage = {
    receiverId: companionOnline ? companionOnline.socketId : loggedUserId,
    message: {
      id: uuid(),
      chatId: chatId,
      sender: loggedUserId,
      text: messageText,
      createdAt: Date.now()
    }
  };
  return socketMessage;
};

export const createHistoryMessage = (chatId: string, loggedUserId: string, messageText: string) => {
  return {
    sender: loggedUserId,
    chatId: chatId,
    text: messageText
  };
};

export const normalizeMessageTime = (time: string) => {
  const parsed = dayjs(time);
  const normalized = parsed.format('HH:mm');
  return normalized;
};

export const normalizeLastMessageTime = (createdAt: string) => {
  const now = dayjs();
  const parsed = dayjs(createdAt);
  if (parsed.isSame(now, 'day')) return parsed.format('HH:mm');
  if (parsed.isSame(now.subtract(1, 'day'), 'day')) return 'yesterday';
  for (let i = 1; i <= 6; i++) {
    const dayOfWeek = now.subtract(i, 'day');
    if (parsed.isSame(dayOfWeek, 'day')) return parsed.format('ddd');
  }
  if (parsed.isSame(now, 'year')) return parsed.format('DD MMM');
  return parsed.format('DD.MM.YY');
};

export const prepareLastMessage = (
  loggedUserId: string,
  message: LiveMessage | IncomingHistoryMessage
) => {
  if (message.sender === loggedUserId) {
    return `You: ${message.text}`;
  }
  return message.text;
};

export function stringToColor(firstName: string, lastName: string) {
  const string = firstName + lastName;
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export function stringAvatar(firstName: string, lastName: string): string {
  return `${firstName[0]}${lastName[0]}`;
}

export const randomIntFromInterval = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const createPostObj = (
  loggedUserId: string,
  firstName: string,
  lastName: string,
  postText: string
) => {
  return {
    _id: uuid(),
    creator: {
      _id: loggedUserId,
      firstName: firstName,
      lastName: lastName
    },
    text: postText,
    likedBy: [],
    createdAt: Date.now()
  };
};

export const normalizePostTime = (createdAt: Date) => {
  const now = dayjs();
  const parsed = dayjs(createdAt);
  if (parsed.isSame(now, 'day')) return `today at ${parsed.format('HH:mm')}`;
  if (parsed.isSame(now.subtract(1, 'day'), 'day')) return `yesterday at ${parsed.format('HH:mm')}`;
  for (let i = 1; i <= 6; i++) {
    const dayOfWeek = now.subtract(i, 'day');
    if (parsed.isSame(dayOfWeek, 'day'))
      return `${parsed.format('ddd')} at ${parsed.format('HH:mm')}`;
  }
  if (parsed.isSame(now, 'year')) return `${parsed.format('DD MMM')} at ${parsed.format('HH:mm')}`;
  return parsed.format('DD.MM.YY');
};

export const calculateAge = (dateOfBirth: Date) => {
  const today = dayjs();
  return today.diff(dateOfBirth, 'year');
};

export const convertToBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
      reject('Only image files accepted! Try again');
    }
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => resolve(fileReader.result);
    fileReader.onerror = (err) => reject(err);
  });
};
