import { NextFunction, Request, Response } from "express";
import { postsServices } from "../services/posts.services.js";

const createPost = async (req: Request, res: Response) => {
  const post = req.body
  await postsServices.createPost(post)
  return res.status(201).json({created: `post: '${post.text}'`})
}

const getPostsByUser = async (req: Request, res: Response) => {
  const { userId } = req.params
  const posts = await postsServices.getPostsByUser(userId)
  return res.status(201).json(posts)
}

const getPostsByFriends= async (req: Request, res: Response) => {
  const { friends } = req.body
  const posts = await postsServices.getPostsByFriends(friends)
  return res.status(201).json(posts)
}

const updatePost = async (req: Request, res: Response) => {
  const { postId } = req.params
  await postsServices.updatePost(postId, req.body)
  return res.status(201).json({updated: `post, id: ${postId}`})
}

const deletePost = async (req: Request, res: Response) => {
  const { postId } = req.params
  await postsServices.deletePost(postId)
  return res.status(201).json({deleted: `post, id: ${postId}`})
}

const deletePostsByUser = async (req: Request, res: Response) => {
  const { userId } = req.params
  const deleted = await postsServices.deletePostsByUser(userId)
  return res.status(201).json({deleted: `, id: ${deleted}`})
}

export const postsControllers = { createPost, getPostsByUser, getPostsByFriends, updatePost, deletePostsByUser, deletePost }