import express from "express";
import { userLogin, userRegister } from "../controllers/user.controller";
const Router = express.Router();

Router.post("/", userRegister);
Router.post("/login", userLogin);

export default Router;
