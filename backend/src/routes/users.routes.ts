import express from "express";
import { body } from 'express-validator';
import { validationResultHandler } from "../middleware/validationResultHandler.js";
import { bearerPassport } from "../middleware/passport.js";
import { tryCatch } from "../helpers/tryCatch.js";
import { usersControllers } from "../controllers/users.controllers.js";


const router = express.Router()

router.get('/',
  bearerPassport,
  tryCatch(usersControllers.getUserByParams)
)

router.get('/getFilteredUsers', tryCatch(usersControllers.getFilteredUsers))

router.get('/:userId',
  bearerPassport,
  tryCatch(usersControllers.getUserById) 
)

router.post('/', 
  body('firstName', 'first name is required').notEmpty(),
  body('lastName', 'last name is required').notEmpty(),
  body('email', 'email is required').notEmpty(),
  body('email', 'invalid email format').isEmail(),
  body('password', 'password is required').notEmpty(),
  body(
    'password', 
    'password should be min 5 and max 25 symbols in length'
    )
    .isLength({min: 5, max: 25}
  ),
  validationResultHandler,
  tryCatch(usersControllers.createUser)
)

router.patch('/:userId',
  bearerPassport,
  tryCatch(usersControllers.updateUser)
)

router.delete('/:userId',
  bearerPassport,
  tryCatch(usersControllers.deleteUser)
)

export default router;