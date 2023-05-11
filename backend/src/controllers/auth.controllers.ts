import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { usersServices } from '../services/users.services.js';
import { AuthenticationError } from "../errors.js";

interface IDecoded {
  id: string;
}

const logIn = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body
  const user = await usersServices.getUserForAuth({email: email})
  if(!user[0]) {
    next(new AuthenticationError('No user with this email'));
  }
  console.log(user[0]);
  const passValid = await bcrypt.compare(password, user[0].password)
  if(!passValid) {
    next(new AuthenticationError('Wrong password'));
  }
  const { id } = user[0]
  const accessToken = await jwt.sign({ id }, process.env.JWT_ACCESS_SIGN!, { expiresIn: '5m' });
  const refreshToken = await jwt.sign({ id }, process.env.JWT_REFRESH_SIGN!);
  res.cookie('jwtRef', refreshToken, {httpOnly: true});
  return res.status(201).json({accessToken: accessToken, userId: id});
}

const refreshAccess = async (req: Request, res: Response, next: NextFunction) => {
  const { jwtRef } = req.cookies
  const decoded = jwt.verify(jwtRef, process.env.JWT_REFRESH_SIGN!) as IDecoded;
  if(!decoded) {
    next(new AuthenticationError('Invalid refresh token'));
  }
  const newAccess = await jwt.sign({ id: decoded.id }, process.env.JWT_ACCESS_SIGN!, { expiresIn: '5m' })
  return res.status(201).json({accessToken: newAccess});
}

export const authControllers = {
  logIn,
  refreshAccess
}