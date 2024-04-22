import express from "express";
import {
  createMusic,
  deleteMusicById,
  getMusicById,
  updateMusic,
} from "../controllers/music.controller";

const Router = express.Router();

Router.get("/:id", getMusicById);
Router.post("", createMusic);
Router.put("/:id", updateMusic);
Router.delete("/:id", deleteMusicById);

export default Router;
