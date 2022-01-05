/**
 * Auth route logic
 */

//Dependencies
import express from 'express';
import { getUserHandler, userLoginHandler, userLogoutHandler, userSignupHandler } from '../controllers/auth.controller';
import { auth } from '../middleware/auth';
import { validateSchema } from '../middleware/validateResource';
import { createUserSchema, loginUserSchema } from '../schema/user.schema';

//Create the router
const router = express.Router();

//Register route
router.post('/auth/register', validateSchema(createUserSchema), userSignupHandler);

//Login route
router.post('/auth/login', validateSchema(loginUserSchema), userLoginHandler);

//Log-out
router.post('/auth/logout', userLogoutHandler);

//Get the uset
router.get('/auth/user', auth, getUserHandler);

//Export the router
export { router as authRouter };
