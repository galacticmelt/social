import { NextFunction, Request, Response } from "express"
import { AuthenticationError, DocExistsError, DocNotFoundError, ValidationError } from "../errors.js"

export const globalErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  switch(true) {
    case err instanceof ValidationError:
      return res.status(400).json({error: err.message})
    case err instanceof AuthenticationError:
      return res.status(401).json({error: err.message})
    case err instanceof DocNotFoundError:
      return res.status(404).json({error: err.message})
    case err instanceof DocExistsError:
      return res.status(409).json({error: err.message})
    default: 
      console.log(err.name);
      return res.status(500).json({error: err.message})
  }
}
