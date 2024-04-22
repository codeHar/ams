import express from "express";
import {
  createArtist,
  deleteArtistById,
  getAllArtists,
  getArtistById,
  getMusicByArtist,
  updateArtist,
} from "../controllers/artist.controller";
const Router = express.Router();

Router.get("", getAllArtists);
Router.get("/:id", getArtistById);
Router.post("", createArtist);
Router.put("/:id", updateArtist);
Router.delete("/:id", deleteArtistById);
Router.get("/:id/music", getMusicByArtist);

export default Router;
