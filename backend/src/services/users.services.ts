import User from "../models/user.model.js"
import { ObjectId } from "mongodb";
import { calculateIndices, generatePaginationPipeline } from "../helpers/pagination.js";

interface UserCreate {
  firstName: string,
  lastName: string,
  dateOfBirth: Date,
  location?: string,
  almaMater?: string,
  email: string,
  password: string
}

interface UserUpdate {
  firstName?: string,
  lastName?: string,
  dateOfBirth?: Date,
  location?: string,
  almaMater?: string,
}

interface UserGetByParams {
  _id?: any,
  email?: string 
}

interface UsersGetFiltered {
  usersIds: string[];
  name: string;
  age: number[];
  postsCountSort: 1 | -1;
}

interface PaginationData {
  page: number;
  limit: number;
}

const getUserByParams = (params: UserGetByParams) => {
  return User.find(params, { password: 0 })
}

const getUserForAuth= (params: UserGetByParams) => {
  return User.find(params);
}

const getUsersFiltered = async (params: UsersGetFiltered, pagination: PaginationData) => {
  const pipeline = []
  pipeline.push(
    {$project: { 
      "firstName": 1,
      "lastName": 1,
      "fullName": { $concat : [ "$firstName", " ", "$lastName"] },
      "fullNameBackwards": { $concat : [ "$lastName", " ", "$firstName"] },
      "age": {
        $subtract: [
           { $subtract: [{ $year: "$$NOW" }, { $year: "$dateOfBirth" }] },
           { $cond: [{ $lt: [{ $dayOfYear: "$dateOfBirth" }, { $dayOfYear: "$$NOW" }] }, 0, 1] }
        ]
      },
      "postsCount": { $cond: [{ $isArray: "$posts" }, { $size: "$posts" }, 0]}
    }}
  )
  const usersIds = params.usersIds?.map(id => new ObjectId(id))
  const { name, age, postsCountSort } = params
  if (usersIds) pipeline.push({ $match: {"_id": { $in: usersIds } }})
  if (name) pipeline.push({ 
    $match: { 
      $or: [
        {"fullName": { $regex: new RegExp(`^${name}`, 'i') }}, 
        {"fullNameBackwards": { $regex: new RegExp(`^${name}`, 'i') }}, 
      ]
    }
  })
  if (age) pipeline.push({ $match: {"age": { $gte: age[0], $lte: age[1] }}})
  if (postsCountSort) pipeline.push({ $sort: { "postsCount": postsCountSort }})
  const { page, limit } = pagination
  const indices = calculateIndices(page, limit);
  const paginationPipeline = generatePaginationPipeline(page, limit, indices.startIndex, indices.endIndex)
  paginationPipeline.forEach(stage => pipeline.push(stage));
  const users = await User.aggregate(pipeline, {allowDiskUse: true});
  return users[0]
}

const getUserById = (userId: string) => {
  return User.findById(userId, { password: 0 }).populate({path: 'friends', model: 'User', select: ['firstName', 'lastName']})
}

const createUser = (user: UserCreate) => {
  return User.create(user);
}

const deleteUser = (userId: string) => {
  return User.findByIdAndDelete(userId)
}

const updateUser = (userId: string, update: UserUpdate) => {
  return User.findByIdAndUpdate(userId, update)
}

export const usersServices = { 
  getUserByParams, 
  getUserForAuth,
  getUsersFiltered,
  getUserById, 
  createUser, 
  deleteUser, 
  updateUser 
}