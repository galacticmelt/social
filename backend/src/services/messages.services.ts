import Message from "../models/message.model.js";

interface IMessage {
  sender: string,
  chatId: string,
  text: string
}

const createMessage = (message: IMessage) => {
  return Message.create(message)
}

const getMessagesByChat = (chatId: string) => {
  return Message.find({chatId}).sort({ "createdAt": 1 })
}

const deleteMessage = (messageId: string) => {
  return Message.findByIdAndDelete(messageId)
}

const deleteMessagesByChat = (chatId: string) => {
  return Message.deleteMany({chatId})
}

export const messagesServices = { createMessage, getMessagesByChat, deleteMessage, deleteMessagesByChat }