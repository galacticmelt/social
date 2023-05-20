import Message from "../models/message.model.js";
import { ObjectId } from "mongodb";
import { calculateIndices, generatePaginationPipeline } from "../helpers/pagination.js";

interface IMessage {
  sender: string,
  chatId: string,
  text: string
}

interface PaginationData {
  page: number;
  limit: number;
}

const messagesSort: 1 | -1 = -1

const createMessage = (message: IMessage) => {
  return Message.create(message)
}

const getMessagesByChat = async (chatId: string, pagination: PaginationData) => {
  const id = new ObjectId(chatId);
  const pipeline = []
  pipeline.push(
    {$project: { 
      "sender": 1,
      "chatId": 1,
      "text": 1,
      "createdAt": 1
    }},
    {$match: { "chatId": id }},
    {$sort: { "createdAt": messagesSort }}
  )
  const { page, limit } = pagination
  const indices = calculateIndices(page, limit);
  const paginationPipeline = generatePaginationPipeline(page, limit, indices.startIndex, indices.endIndex)
  paginationPipeline.forEach(stage => pipeline.push(stage));
  const messages = await Message.aggregate(pipeline, {allowDiskUse: true});
  return messages[0];
}

const deleteMessage = (messageId: string) => {
  return Message.findByIdAndDelete(messageId)
}

const deleteMessagesByChat = (chatId: string) => {
  return Message.deleteMany({chatId})
}

export const messagesServices = { createMessage, getMessagesByChat, deleteMessage, deleteMessagesByChat }