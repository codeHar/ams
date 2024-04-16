import express from "express";
import { userLogin, userRegister } from "../controllers/user.controller";
const Router = express.Router();

Router.post("/register", userRegister);
Router.post("/login", userLogin);

export default Router;
