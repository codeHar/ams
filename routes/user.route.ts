import express from "express";
import { userRegister } from "../controllers/user.controller";
const Router = express.Router();

Router.post("/", userRegister);

export default Router;
