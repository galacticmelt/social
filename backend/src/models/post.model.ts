import { db } from '../db.js'

const PostSchema = new db.Schema({
  creator: {
    type: 'ObjectId',
    ref: 'User',
    required: true,
  },
  text: {
    type: String,
    required: true
  },
  image: {
    data: Buffer,
    contentType: String
  },
  likedBy: [{
    type: 'ObjectId',
    ref: 'User'
  }]
})

PostSchema.set('timestamps', true);

const Post = db.model('Post', PostSchema)

export default Post