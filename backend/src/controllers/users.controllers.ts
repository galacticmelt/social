import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { usersServices } from "../services/users.services.js";
import { chatsServices } from "../services/chats.services.js";

const getUserByParams = async (req: Request, res: Response) => {
  const user = await usersServices.getUserByParams(req.body);
  if(!user[0]) {
    return res.status(404).json({error: 'user not found'})
  }
  return res.status(200).json({ user })
}

const getFilteredUsers = async (req: Request, res: Response) => {
  const params = req.body
  const page = parseInt(req.query.page as string)
  const limit = parseInt(req.query.limit as string);
  const users = await usersServices.getUsersFiltered(params, { page, limit });
  return res.status(200).json(users)
}

const getUserById = async (req: Request, res: Response) => {
  const id = req.params.userId
  const user = await usersServices.getUserById(id);
  if(!user) {
    return res.status(404).json({error: 'user not found'})
  }
  return res.status(200).json({ user })
}

const createUser = async (req: Request, res: Response) => {
  const { password } = req.body
  const hashedPass = await bcrypt.hash(password, 10);
  const user = await usersServices.createUser({...req.body, password: hashedPass})
  return res.status(201).json({created: `user with id '${user.id}'`});
}

const updateUser = async (req: Request, res: Response) => {
  const id = req.params.userId
  const updates = req.body
  await usersServices.updateUser(id, updates)
  return res.status(201).json({updated: `user with id '${id}'`});
}

const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.userId
  await chatsServices.deleteChatsByUser(id);
  await usersServices.deleteUser(id)
  return res.status(200).json({deleted: `user with id '${id}'`});
}

export const usersControllers = {
  getUserByParams, getUserById, getFilteredUsers, createUser, updateUser, deleteUser  
}

