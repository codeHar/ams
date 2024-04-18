import express from "express";
import { createArtist, getAllArtists } from "../controllers/artist.controller";
const Router = express.Router();

Router.get("", getAllArtists);
Router.post("", createArtist);

export default Router;
