import express from "express";
import {
  getAllUser,
  userLogin,
  userRegister,
} from "../controllers/user.controller";
const Router = express.Router();

Router.get("", getAllUser);
Router.post("/register", userRegister);
Router.post("/login", userLogin);

export default Router;
