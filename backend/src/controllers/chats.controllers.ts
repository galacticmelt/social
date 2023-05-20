import { NextFunction, Request, Response } from "express";
import Chat from "../models/chat.model.js";
import User from "../models/user.model.js";
import { chatsServices } from "../services/chats.services.js";
import { messagesServices } from "../services/messages.services.js";
import { DocExistsError } from "../errors.js";
import { usersServices } from "../services/users.services.js";
import { ObjectId } from "mongodb";

const createChat = async (req: Request, res: Response, next: NextFunction) => {
  const users = req.body.users
  const duplicate = await Chat.find({
    $and: [
      { users: { $in: [users[0]] } },
      { users: { $in: [users[1]] } }
    ]
  })
  if(duplicate[0]) {
    next(new DocExistsError('chat between these users already exists'));
  }
  let newChat = await chatsServices.createChat({users: [...users]})
  newChat = await newChat.populate({path: 'users', select: 'username'});
  users.forEach(async (user: string) => {
    const friendId = users.find((id: string) => id !== user)
    await User.findByIdAndUpdate(user, { $push: { friends: friendId } })
  });
  return res.status(201).json(newChat);
}

const getChatsByUser = async (req: Request, res: Response) => {
  const userId = req.params.userId
  const chats = await chatsServices.getChatsByUser(userId)
  return res.status(200).json(chats)
}

const getChatById = async (req: Request, res: Response) => {
  const chatId = req.params.chatId
  const chat = await chatsServices.getChatById(chatId)
  return res.status(200).json(chat)
}

const deleteChat = async (req: Request, res: Response) => {
  const chatId = req.params.chatId
  const chat = await chatsServices.getChatById(chatId).lean();
  const users = chat?.users;
  users?.forEach(async (user: ObjectId) => {
    const friendId = users.find((id: ObjectId) => id !== user)
    await User.findByIdAndUpdate(user, { $pull: { friends: friendId } })
  });
  await messagesServices.deleteMessagesByChat(chatId);
  await chatsServices.deleteChat(chatId);
  return res.status(200).json({deleted: `chat with id '${chatId}'`})
}

export const chatsControllers = { createChat, getChatsByUser, getChatById, deleteChat }
