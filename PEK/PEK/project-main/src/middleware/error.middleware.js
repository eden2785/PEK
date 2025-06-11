/**
 * Middleware to handle errors globally
 * Logs the error and returns a JSON response with status 500
 */
export const errorHandler = (err, req, res, next) => {
  console.error(err); // Log error details to the console
  res.status(500).json({ message: err.message }); // Send error response
};
