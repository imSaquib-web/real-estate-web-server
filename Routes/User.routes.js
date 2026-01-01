const userRouter = require("express").Router();
const userController = require("../Controller/User.controller");

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.get("/", userController.getUser);

module.exports = userRouter;
