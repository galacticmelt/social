import passport from 'passport';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

passport.use(new BearerStrategy(
  async (authToken, done) => {
    await jwt.verify(authToken, process.env.JWT_ACCESS_SIGN!, (err, decoded) => {
      if(err) {
        return done(err);
      }
      done(null, true);
    });
  }
))

export const bearerPassport = (req: Request, res: Response, next: NextFunction) => {
  return passport.authenticate(
    'bearer', 
    { session: false },
    (err: any, value: any, info: any) => {
      if(!req.headers.authorization) {
        return res.status(400).json({error: 'Token not provided'})
      } else if (err) {
        return res.status(401).json({error: err.message})
      }
      next()
    }
  )(req, res, next)
}

export default passport;