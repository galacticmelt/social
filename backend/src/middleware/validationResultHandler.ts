import { NextFunction, Request, Response } from "express"
import { validationResult } from 'express-validator';
import { ValidationError } from "../errors.js";

export const validationResultHandler = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
    if(!errors.isEmpty()) {
      const errorsArr = errors.array();
      const errMessages = errorsArr.map(errObj => errObj.msg);
      if(errMessages.length > 1) {
        next(new ValidationError(errMessages.join(', '))) 
      }
      next(new ValidationError(errMessages[0]));
    }
    next()
}