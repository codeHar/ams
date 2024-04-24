import express from "express";
import {
  createUser,
  deleteUserById,
  getAllUser,
  getUserById,
  updateUser,
  userLogin,
  userRegister,
} from "../controllers/user.controller";
import { authenticateToken } from "../utils/authenticate";
import { validateCreateUser, validateRegisterUser } from "../validations";
const Router = express.Router();

Router.get("", authenticateToken, getAllUser);
Router.post("", authenticateToken, validateCreateUser, createUser);
Router.post("/register", validateRegisterUser, userRegister);
Router.post("/login", userLogin);
Router.get("/:id", authenticateToken, getUserById);
Router.put("/:id", authenticateToken, validateCreateUser, updateUser);
Router.delete("/:id", authenticateToken, deleteUserById);

export default Router;
