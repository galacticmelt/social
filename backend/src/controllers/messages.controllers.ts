import { NextFunction, Request, Response } from "express";
import { messagesServices } from "../services/messages.services.js";
import { chatsServices } from "../services/chats.services.js";

const createMessage = async (req: Request, res: Response) => {
  const messageData = req.body
  const message = await messagesServices.createMessage(messageData)
  await chatsServices.updateChat(messageData.chatId, { lastMessage: message.id })
  return res.status(201).json({created: `message: '${message.text}'`})
}

const getMessagesByChat = async (req: Request, res: Response) => {
  const chatId = req.params.chatId
  const messages = await messagesServices.getMessagesByChat(chatId)
  return res.status(200).json(messages)
}

const deleteMessage = async (req: Request, res: Response) => {
  const messageId = req.params.messageId
  const deleted = messagesServices.deleteMessage(messageId)
  return res.status(200).json({deleted: `message, id: ${deleted}`})
}

const deleteMessagesByChat = async (req: Request, res: Response) => {
  const deleted = messagesServices.deleteMessage(req.params.chatId)
  return res.status(200).json({deleted: `, id: ${deleted}`})
}

export const messagesControllers = { createMessage, getMessagesByChat, deleteMessage }
