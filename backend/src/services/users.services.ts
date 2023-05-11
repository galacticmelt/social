import { param } from "express-validator"
import User from "../models/user.model.js"

interface IUserCreate {
  firstName: string,
  lastName: string,
  dateOfBirth: Date,
  location?: string,
  almaMater?: string,
  email: string,
  password: string
}

interface IUserUpdate {
  firstName?: string,
  lastName?: string,
  dateOfBirth?: Date,
  location?: string,
  almaMater?: string,
}

interface IUserGetByParams {
  _id?: any,
  email?: string 
}

const getUserByParams = (params: IUserGetByParams) => {
  return User.find(params, { password: 0 })
}

const getUserForAuth= (params: IUserGetByParams) => {
  return User.find(params);
}

const getUserById = (userId: string) => {
  return User.findById(userId, { password: 0 }).populate({path: 'friends', model: 'User', select: ['firstName', 'lastName']})
}

const createUser = (user: IUserCreate) => {
  return User.create(user);
}

const deleteUser = (userId: string) => {
  return User.findByIdAndDelete(userId)
}

const updateUser = (userId: string, update: IUserUpdate) => {
  return User.findByIdAndUpdate(userId, update)
}

export const usersServices = { 
  getUserByParams, 
  getUserForAuth,
  getUserById, 
  createUser, 
  deleteUser, 
  updateUser 
}