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
const Router = express.Router();

Router.get("", authenticateToken, getAllUser);
Router.post("", authenticateToken, createUser);
Router.post("/register", userRegister);
Router.post("/login", userLogin);
Router.get("/:id", authenticateToken, getUserById);
Router.put("/:id", authenticateToken, updateUser);
Router.delete("/:id", authenticateToken, deleteUserById);

export default Router;
