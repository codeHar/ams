import express from "express";
import {
  createArtist,
  getAllArtists,
  getArtistById,
} from "../controllers/artist.controller";
const Router = express.Router();

Router.get("", getAllArtists);
Router.get("/:id", getArtistById);
Router.post("", createArtist);

export default Router;
