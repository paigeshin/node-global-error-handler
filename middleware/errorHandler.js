const AppError = require("../AppError");

// Global Error Handling Middleawre
const errorHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      errorCode: err.errorCode,
      message: err.message,
    });
  }
  return res.status(400).send(err.message);
};

module.exports = errorHandler;
