import { db } from '../db.js'

const UserSchema = new db.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
  },
  almaMater: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  friends: [
    {
      type: 'ObjectId',
      ref: 'Chat'
    }
  ],
  posts: [
    {
      type: 'ObjectId',
      ref: 'Post'
    }
  ]
})
const User = db.model('User', UserSchema)

export default User 