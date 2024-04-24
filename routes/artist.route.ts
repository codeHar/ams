import express from "express";
import {
  createArtist,
  deleteArtistById,
  exportArtistsToCSV,
  getAllArtists,
  getArtistById,
  getMusicByArtist,
  importArtistFromCSV,
  updateArtist,
} from "../controllers/artist.controller";
import multer from "multer";
const Router = express.Router();
const upload = multer({ dest: "uploads/" });

Router.get("", getAllArtists);
Router.get("/export-csv", exportArtistsToCSV);
Router.post("/import-csv", upload.single("csv"), importArtistFromCSV);

Router.get("/:id", getArtistById);
Router.post("", createArtist);
Router.put("/:id", updateArtist);
Router.delete("/:id", deleteArtistById);
Router.get("/:id/music", getMusicByArtist);

export default Router;
