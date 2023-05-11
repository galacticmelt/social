import { NextFunction, Request, Response } from "express"

type Controller = (req: Request, res: Response, next: NextFunction) => void

export const tryCatch = (controller: Controller) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res, next)
    } catch (err) {
      return next(err)
    }
  }
}