import { Router } from 'express';
import { getUsers, createUser, getUserDetails } from '../controllers/user.controller.js';

// Creating a new router instance
const userRouter = Router();

/**
 * Route to retrieve all users
 * GET /
 */
userRouter.get('/', getUsers);

/**
 * Route to retrieve details of a specific user by ID
 * GET /:id
 */
userRouter.get('/:id', getUserDetails);

/**
 * Route to create a new user
 * POST /
 */
userRouter.post('/', createUser);

export default userRouter;