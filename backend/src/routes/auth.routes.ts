import express from "express";
import { body } from 'express-validator';
import { validationResultHandler } from "../middleware/validationResultHandler.js";
import { tryCatch } from "../helpers/tryCatch.js";
import { authControllers } from "../controllers/auth.controllers.js";

const router = express.Router();

router.post('/', 
  body('email', 'email is required').notEmpty(),
  body('email', 'invalid email format').isEmail(),
  body('password', 'password is required').notEmpty(),
  validationResultHandler,
  tryCatch(authControllers.logIn)
)

router.post('/refresh-access',
  tryCatch(authControllers.refreshAccess)
)

export default router;