import express from "express";
import { createUser } from "../controllers/user.controller";
const Router = express.Router();

Router.post("/", createUser);

export default Router;
