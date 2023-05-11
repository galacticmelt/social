import { db } from '../db.js'

const MessageSchema = new db.Schema({
  sender: {
    type: 'ObjectId',
    ref: 'User',
    required: true,
  },
  chatId: {
    type: 'ObjectId',
    ref: 'Chat',
    required: true
  },
  text: {
    type: String,
    required: true
  },
})

MessageSchema.set('timestamps', true);

const Message = db.model('Message', MessageSchema)

export default Message