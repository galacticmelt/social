import { ObjectId } from "mongodb";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import { calculateIndices, generatePaginationPipeline } from "../helpers/pagination.js";
import { count } from "console";

interface PostCreate {
  creator: string,
  text: string,
  image?: any
}

interface PostUpdates {
  text?: string,
  likedBy?: string[]
}

interface PostsGetFiltered {
  usersIds?: string[];
  likesCountSort?: 1 | -1;
  updatedAtSort?: 1 | -1;
}

interface PaginationData {
  page: number;
  limit: number;
}

const createPost = (post: PostCreate) => {
  return Post.create(post)
}

const getFilteredPosts = async (params: PostsGetFiltered, pagination: PaginationData) => {
  const pipeline = [];
  pipeline.push(
    {$project: { 
      "creator": 1,
      "text": 1,
      "image": 1,
      "createdAt": 1,
      "likedBy": 1,
      "likesCount": { $cond: [{ $isArray: "$likedBy" }, { $size: "$likedBy" }, 0]}
    }}
  )
  const usersIds = params.usersIds?.map(id => new ObjectId(id))
  const { updatedAtSort, likesCountSort } = params
  if (usersIds) pipeline.push({ $match: { "creator": { $in: usersIds } } })
  if (likesCountSort && !updatedAtSort) pipeline.push({ $sort: { "likesCount": likesCountSort } })
  if (updatedAtSort && !likesCountSort) pipeline.push({ $sort: { "updatedAt": updatedAtSort } })
  if (updatedAtSort && likesCountSort) pipeline.push({ $sort: { "likesCount": likesCountSort, "updatedAt": updatedAtSort } })
  pipeline.push(
    {$lookup: {
      from: "users",
      localField: "creator",
      foreignField: "_id",
      pipeline: [
        {$project: {
          _id: 1,
          firstName: 1,
          lastName: 1
        }}
      ],
      as: "creator",
    }},
    {$unwind: "$creator"},
  )
  let { page, limit } = pagination
  const indices = calculateIndices(page, limit);
  const paginationPipeline = generatePaginationPipeline(page, limit, indices.startIndex, indices.endIndex)
  paginationPipeline.forEach(stage => pipeline.push(stage));
  const posts = await Post.aggregate(pipeline, {allowDiskUse: true})
  return posts[0]
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

export const postsServices = { createPost, getPostsByUser, getFilteredPosts, updatePost, deletePost, deletePostsByUser }