# node-global-error-handler

### ./AppError.js

```jsx
class AppError extends Error {
  constructor(errorCode, message, statusCode) {
    super(message);
    this.errorCode = errorCode;
    this.statusCode = statusCode;
  }
}

module.exports = AppError;
```

### ./utils/tryCatch.js
```jsx 
exports.tryCatch = (controller) => async (req, res, next) => {
  try {
    await controller(req, res, next);
  } catch (error) {
    return next(error);
  }
};

```

### ./middleware/errorHandler.js
```jsx
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


### ./constants/errorCodes.js

```jsx
exports.INVLAID_SUBSCRIPTION = 300;
exports.ACCOUNT_LOCKED = 301;
```

### ./app.js
```jsx
const express = require("express");
const { tryCatch } = require("./utils/tryCatch");
const errorHandler = require("./middleware/errorHandler");
const {
  INVLAID_SUBSCRIPTION,
  ACCOUNT_LOCKED,
} = require("./constants/errorCodes");
const AppError = require("./AppError");
const app = express();

app.get(
  "/test",
  tryCatch(async (req, res) => {
    const user = undefined;
    const subscription = undefined;
    if (!subscription) {
      throw new AppError(INVLAID_SUBSCRIPTION, "Subscription is invalid", 400);
    }
    if (!user) {
      throw new AppError(ACCOUNT_LOCKED, "account is locked", 400);
    }
    return res.status(200).json({ success: true });
  })
);

app.post(
  "/login",
  tryCatch(async (req, res) => {})
);

// INSTALL GLOBVAL ERROR HANDLER
app.use(errorHandler);

app.listen(4000, () => {
  console.log("Server running on port 4000");
});

```
