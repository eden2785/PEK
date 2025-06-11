import { Router } from 'express';
import controller from '../controllers/cost.controller.js';

// Destructuring controller methods
const { getCosts, addCost, getMonthlyReport } = controller;

// Creating a new router instance
const costRouter = Router();

/**
 * Route to get all costs
 * GET /
 */
costRouter.get('/', getCosts);


/**
 * Route to add a new cost entry
 * POST /add
 */
costRouter.post('/add', addCost);

/**
 * Route to generate a monthly report
 * GET /report
 */
costRouter.get('/report', getMonthlyReport);

export default costRouter;