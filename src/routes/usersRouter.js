const express = require("express");
const {
  getUsersController,
  addUsersController,
} = require("../controllers/usersControllers.js");
const { asyncWrapper } = require("../helpers/apiHelpes.js");
const { addUserValidation } = require("../middlewares/validationMiddleware.js");

const usersRouter = new express.Router();

usersRouter
  .route("/")
  .get(asyncWrapper(getUsersController))
  .post(addUserValidation, asyncWrapper(addUsersController));

module.exports = usersRouter;
