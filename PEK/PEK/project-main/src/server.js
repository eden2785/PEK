import express, { json } from 'express';
import morgan from 'morgan';
import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Importing route handlers
import userRouter from './routes/user.router.js';
import costRouter from './routes/cost.router.js';
import aboutRouter from './routes/about.router.js';

// Database connection function
import connectDB from './config/database.config.js';

// Custom error handler middleware
import { errorHandler } from './middleware/error.middleware.js';

// Controller functions
import { getAbout } from './controllers/about.controller.js';
import costController from './controllers/cost.controller.js';
const { getMonthlyReport, addCost } = costController;

// Define __dirname for ES modules (not available by default)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
config();

const main = async () => {
  // Connect to MongoDB
  await connectDB();
  const app = express();

  // Serve static files (like CSS, images) from the "public" directory
  app.use(express.static(path.join(__dirname, 'public')));

  // Serve the homepage (index.html) from the "views" directory
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
  });

  // Global middleware
  app.use(json());
  app.use(morgan('dev'));
  app.use(errorHandler);

  // Define API routes
  app.use('/api/users', userRouter);
  app.use('/api/costs', costRouter);
  app.use('/api/about', aboutRouter);

  // Additional endpoints
  app.get('/api/about/', getAbout);
  app.get('/api/report/', getMonthlyReport);
  app.post('/api/add/', addCost);

  // Start the server on specified port
  const PORT = process.env.PORT || 5000;
  return app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);

  });
};

main();
