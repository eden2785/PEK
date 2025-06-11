import { Router } from 'express';
import { getAbout } from '../controllers/about.controller.js';

// Creating a new router instance
const aboutRouter = Router();

/**
 * Route to retrieve information about the team
 * GET /
 */
aboutRouter.get('/', getAbout);

export default aboutRouter;