import { db } from '../db.js'

const ChatSchema = new db.Schema({
  users: [{
    type: 'ObjectId',
    ref: 'User'
  }],
  lastMessage: {
    type: 'ObjectId',
    ref: 'Message'
  }
})

const Chat = db.model('Chat', ChatSchema)

export default Chat