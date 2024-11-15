const express = require("express");
const {
  signUp,
  getUser,
  getAllUsers,
  logIn,
  getUserAndRecipes,
  getUserById,
} = require("../controller/user-controller");
const userRouter = express.Router();

userRouter.post("/signup", signUp);
userRouter.post("/login", logIn);
userRouter.get("/all", getAllUsers);
userRouter.get("/id", getUser);
userRouter.post("/userRecipes", getUserAndRecipes);
userRouter.post("/get", getUserById);

module.exports = userRouter;
