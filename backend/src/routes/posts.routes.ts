import express from "express";
import { body, param } from 'express-validator';
import { bearerPassport } from "../middleware/passport.js";
import { validationResultHandler } from "../middleware/validationResultHandler.js";
import { tryCatch } from "../helpers/tryCatch.js";
import { postsControllers } from "../controllers/posts.controllers.js";

const router = express.Router();

router.post('/', 
  bearerPassport,
  body('creator', 'creator is required').notEmpty(),
  body('text', 'text is required').notEmpty(),
  body('text', 'max message size exceeded').isLength({max: 1000}),
  validationResultHandler,
  tryCatch(postsControllers.createPost)
);

router.get('/getByUser/:userId', 
  param('userId', 'invalid user id').matches(/^[0-9a-fA-F]{24}$/),
  validationResultHandler,
  tryCatch(postsControllers.getPostsByUser)
);

router.post('/getFilteredPosts', 
  body('page', 'page number is required').notEmpty(),
  body('limit', 'documents limit is required').notEmpty(),
  validationResultHandler,
  tryCatch(postsControllers.getFilteredPosts)
);

router.patch('/:postId', 
  bearerPassport,
  param('postId', 'invalid post id').matches(/^[0-9a-fA-F]{24}$/),
  validationResultHandler,
  tryCatch(postsControllers.updatePost)
);

router.delete('/deleteByUser/:userId', 
  bearerPassport,
  param('userId', 'invalid user id').matches(/^[0-9a-fA-F]{24}$/),
  validationResultHandler,
  tryCatch(postsControllers.deletePostsByUser)
);

router.delete('/:postId', 
  bearerPassport,
  tryCatch(postsControllers.deletePost)
);

export default router