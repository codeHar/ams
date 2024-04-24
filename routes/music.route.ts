import express from "express";
import {
  createMusic,
  deleteMusicById,
  getMusicById,
  updateMusic,
} from "../controllers/music.controller";
import { authenticateToken } from "../utils/authenticate";

const Router = express.Router();

Router.get("/:id", authenticateToken, getMusicById);
Router.post("", authenticateToken, createMusic);
Router.put("/:id", authenticateToken, updateMusic);
Router.delete("/:id", authenticateToken, deleteMusicById);

export default Router;
