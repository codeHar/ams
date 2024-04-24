import express from "express";
import {
  createMusic,
  deleteMusicById,
  getMusicById,
  updateMusic,
} from "../controllers/music.controller";
import { authenticateToken } from "../utils/authenticate";
import {
  validateCreateMusic,
  validateUpdateMusic,
} from "../validations/musicSchema";

const Router = express.Router();

Router.get("/:id", authenticateToken, getMusicById);
Router.post("", authenticateToken, validateCreateMusic, createMusic);
Router.put("/:id", authenticateToken, validateUpdateMusic, updateMusic);
Router.delete("/:id", authenticateToken, deleteMusicById);

export default Router;
