import { Request, Response } from "express";
import db from "../database";
import {
  DELETE_MUSIC_BY_ID_QUERY,
  INSERT_MUSIC,
  SELECT_MUSIC,
  UPDATE_MUSIC_QUERY,
} from "../queries/music.queries";
import { RowDataPacket } from "mysql2";
import { customResponse } from "../utils/customResponse";

export const createMusic = async (req: Request, res: Response) => {
  try {
    const { artistId, title, album_name, genre } = req.body;

    if (!artistId || !title || !album_name || !genre) {
      throw new Error("All fields are required");
    }

    await db.query(INSERT_MUSIC, [artistId, title, album_name, genre]);

    res.status(200).send(
      customResponse({
        message: "Music created successfully",
      })
    );
  } catch (err) {
    if (err instanceof Error) {
      return res
        .status(400)
        .send(customResponse({ message: err?.message, status: false }));
    }
    res.status(400).send(
      customResponse({
        message: "Error while creating music",
        status: false,
      })
    );
  }
};

export const getMusicById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const [matches] = await db.query(SELECT_MUSIC, [id]);

    const music = matches as RowDataPacket[][0];

    console.log({ music });
    res.status(200).send(
      customResponse({
        message: "Successfully retrieved music data",
        payload: music[0],
      })
    );
  } catch (err) {
    if (err instanceof Error) {
      return res
        .status(400)
        .send(customResponse({ message: err?.message, status: false }));
    }
    res.status(400).send(
      customResponse({
        message: "Error while getting music",
        status: false,
      })
    );
  }
};

export const updateMusic = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { title, album_name, genre } = req.body;

    if (!title || !album_name || !genre) {
      throw new Error("All fields are required");
    }

    await db.query(UPDATE_MUSIC_QUERY, [title, album_name, genre, id]);

    res.status(200).send(
      customResponse({
        message: "Music updated successfully",
      })
    );
  } catch (err) {
    if (err instanceof Error) {
      return res
        .status(400)
        .send(customResponse({ message: err?.message, status: false }));
    }
    res.status(400).send(
      customResponse({
        message: "Error while updating music",
        status: false,
      })
    );
  }
};

export const deleteMusicById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await db.query(DELETE_MUSIC_BY_ID_QUERY, [id]);

    res.status(200).send(
      customResponse({
        message: `Successfully deleted music`,
      })
    );
  } catch (err) {
    if (err instanceof Error) {
      return res
        .status(400)
        .send(customResponse({ message: err?.message, status: false }));
    }
    res.status(400).send(
      customResponse({
        message: "Error while deleting music",
        status: false,
      })
    );
  }
};
