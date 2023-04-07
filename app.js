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
