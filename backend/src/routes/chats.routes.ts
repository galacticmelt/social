import express from "express";
import { body, cookie, param } from 'express-validator';
import { validationResultHandler } from "../middleware/validationResultHandler.js";
import { tryCatch } from "../helpers/tryCatch.js";
import { chatsControllers } from "../controllers/chats.controllers.js";
import { bearerPassport } from "../middleware/passport.js";

const router = express.Router();

router.post('/', 
  bearerPassport,
  body('users', 'users is required'),
  validationResultHandler,
  tryCatch(chatsControllers.createChat)
);

router.get('/getByUser/:userId', 
  bearerPassport,
  param('userId', 'invalid user id').matches(/^[0-9a-fA-F]{24}$/),
  tryCatch(chatsControllers.getChatsByUser)
);

router.get('/:chatId', 
  bearerPassport,
  param('chatId', 'invalid chat id').matches(/^[0-9a-fA-F]{24}$/),
  tryCatch(chatsControllers.getChatById)
);

router.delete('/:chatId',
  bearerPassport,
  param('chatId', 'invalid chat id').matches(/^[0-9a-fA-F]{24}$/),
  tryCatch(chatsControllers.deleteChat)
);

export default router;