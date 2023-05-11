import Post from "../models/post.model.js";

interface IPost {
  creator: string,
  text: string,
  image?: any
}

interface PostUpdates {
  text?: string,
  likedBy?: string[]
}

const createPost = (post: IPost) => {
  return Post.create(post)
}

const getPostsByFriends = (friends: string[]) => {
  return Post.find({creator: { $in: [...friends]}})
  .sort({ "createdAt": -1 })
  .populate({path: "creator", model: "User", select: ["firstName", "lastName"]})
}

const getPostsByUser = (userId: string) => {
  return Post.find({ creator: { $in: userId } })
  .sort({ "createdAt": -1 })
  .populate({path: "creator", model: "User", select: ["firstName", "lastName"]})
}

const updatePost = (postId: string, updates: PostUpdates) => {
  return Post.findByIdAndUpdate(postId, updates)
}

const deletePost = (postId: string) => {
  return Post.findByIdAndDelete(postId)
}

const deletePostsByUser = (userId: string) => {
  return Post.deleteMany({userId})
}

export const postsServices = { createPost, getPostsByUser, getPostsByFriends, updatePost, deletePost, deletePostsByUser }