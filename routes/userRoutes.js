import express from "express";
import { login, register } from "../controller/userController.js";

const userRouter = express.Router();

userRouter.post("/login", login);
userRouter.post("/signup", register);

export default userRouter;
