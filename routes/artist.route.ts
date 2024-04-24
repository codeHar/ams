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
import { authenticateToken } from "../utils/authenticate";
const Router = express.Router();
const upload = multer({ dest: "uploads/" });

Router.get("", authenticateToken, getAllArtists);
Router.get("/export-csv", authenticateToken, exportArtistsToCSV);
Router.post(
  "/import-csv",
  authenticateToken,
  upload.single("csv"),
  importArtistFromCSV
);

Router.get("/:id", authenticateToken, getArtistById);
Router.post("", authenticateToken, createArtist);
Router.put("/:id", authenticateToken, updateArtist);
Router.delete("/:id", authenticateToken, deleteArtistById);
Router.get("/:id/music", authenticateToken, getMusicByArtist);

export default Router;
