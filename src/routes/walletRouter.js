const express = require("express");
const {
  getBalansController,
  transactionController,
  transferController,
  getTransactionsController,
} = require("../controllers/walletControllers.js");
const { asyncWrapper } = require("../helpers/apiHelpes.js");
const {
  transactionsValidation,
  transferValidation,
} = require("../middlewares/validationMiddleware.js");

const walletRouter = new express.Router();

walletRouter.route("/").get(asyncWrapper(getBalansController));

walletRouter
  .route("/transaction")
  .get(asyncWrapper(getTransactionsController))
  .post(transactionsValidation, asyncWrapper(transactionController));

walletRouter
  .route("/transfer")
  .post(transferValidation, asyncWrapper(transferController));

module.exports = walletRouter;
