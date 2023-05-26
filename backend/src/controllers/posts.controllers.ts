import { NextFunction, Request, Response } from "express";
import { postsServices } from "../services/posts.services.js";
import User from "../models/user.model.js";

const createPost = async (req: Request, res: Response) => {
  const postData = req.body
  const creator = req.body.creator
  const post = await postsServices.createPost(postData)
  post.save(async (err, savedPost) => {
    await User.findByIdAndUpdate(creator, { $push: { posts: savedPost._id } })
  })
  return res.status(201).json({created: `post: '${post.text}'`})
}

const getPostsByUser = async (req: Request, res: Response) => {
  const { userId } = req.params
  const posts = await postsServices.getPostsByUser(userId)
  return res.status(200).json(posts)
}

const getFilteredPosts= async (req: Request, res: Response) => {
  const params = req.body
  const page = parseInt(req.query.page as string)
  const limit = parseInt(req.query.limit as string);
  const posts = await postsServices.getFilteredPosts(params, { page, limit })
  return res.status(200).json(posts)
}

const updatePost = async (req: Request, res: Response) => {
  const { postId } = req.params
  await postsServices.updatePost(postId, req.body)
  return res.status(201).json({updated: `post, id: ${postId}`})
}

const deletePost = async (req: Request, res: Response) => {
  const { postId } = req.params
  const deleted = await postsServices.deletePost(postId)
  await User.findByIdAndUpdate(deleted?.creator, { $pull: { posts: deleted?._id } })
  return res.status(200).json({deleted: `post, id: ${deleted?._id}`})
}

const deletePostsByUser = async (req: Request, res: Response) => {
  const { userId } = req.params
  const deleted = await postsServices.deletePostsByUser(userId)
  return res.status(200).json({deleted: `, id: ${deleted}`})
}

export const postsControllers = { createPost, getPostsByUser, getFilteredPosts, updatePost, deletePostsByUser, deletePost }