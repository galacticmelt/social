import { NextFunction, Request, Response } from "express"

export const resourceNotFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({error: `${req.method} ${req.originalUrl} not found`})
}