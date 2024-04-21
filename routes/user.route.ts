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
const Router = express.Router();

Router.get("", getAllUser);
Router.post("", createUser);
Router.post("/register", userRegister);
Router.post("/login", userLogin);
Router.get("/:id", getUserById);
Router.put("/:id", updateUser);
Router.delete("/:id", deleteUserById);

export default Router;
