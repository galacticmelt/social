import express from "express";
import { body, param } from 'express-validator';
import { bearerPassport } from "../middleware/passport.js";
import { validationResultHandler } from "../middleware/validationResultHandler.js";
import { tryCatch } from "../helpers/tryCatch.js";
import { messagesControllers } from "../controllers/messages.controllers.js";

const router = express.Router();

router.post('/', 
  bearerPassport,
  body('sender', 'sender is required').notEmpty(),
  body('chatId', 'chatId is required').notEmpty(),
  body('text', 'text is required').notEmpty(),
  body('text', 'max message size exceeded').isLength({max: 1000}),
  validationResultHandler,
  tryCatch(messagesControllers.createMessage)
);

router.get('/getByChat/:chatId', 
  bearerPassport,
  param('chatId', 'invalid chat id').matches(/^[0-9a-fA-F]{24}$/),
  tryCatch(messagesControllers.getMessagesByChat)
);

router.delete('/:messageId', 
  bearerPassport,
  tryCatch(messagesControllers.deleteMessage)
);

export default router