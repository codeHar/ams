import { Request, Response } from "express";
import { RowDataPacket } from "mysql2/promise";
import db from "../database";
import {
  CREATE_ARTIST,
  DELETE_ARTIST_BY_ID_QUERY,
  GET_ALL_ARTISTS,
  GET_ARTIST_BY_ID_QUERY,
  SELECT_MUSIC_BY_ARTIST,
  SELECT_TOTAL_ARTISTS,
  UPDATE_ARTIST_QUERY,
} from "../queries/artist.queries";
import { customResponse } from "../utils/customResponse";
import { SELECT_TOTAL_MUSICS_BY_ARTIST } from "../queries/music.queries";

export const getAllArtists = async (req: Request, res: Response) => {
  try {
    const { page = 1 } = req.query;
    const pageSize = 8;
    const offset = (parseInt(page as string) - 1) * pageSize;

    const [matches] = await db.query(GET_ALL_ARTISTS, [offset, pageSize]);

    const artists = matches as RowDataPacket[];

    const [countRows] = await db.query(SELECT_TOTAL_ARTISTS);
    const total = countRows as RowDataPacket[];
    const totalCount = total[0].totalCount;

    console.log({ artists });
    res.status(200).send(
      customResponse({
        message: "Retrieved artist list successfully",
        payload: { artists, totalCount },
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
        message: "Error while getting artists",
        status: false,
      })
    );
  }
};

export const createArtist = async (req: Request, res: Response) => {
  try {
    const {
      name,
      dob,
      gender,
      address,
      first_release_year,
      no_of_albums_released,
    } = req.body;

    if (
      !name ||
      !dob ||
      !gender ||
      !address ||
      !first_release_year ||
      !no_of_albums_released
    ) {
      throw new Error("All fields are required");
    }

    await db.query(CREATE_ARTIST, [
      name,
      dob,
      gender,
      address,
      first_release_year,
      no_of_albums_released,
    ]);

    res.status(200).send(
      customResponse({
        message: "Artist created successfully",
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
        message: "Error while creating artist",
        status: false,
      })
    );
  }
};

export const getArtistById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const [matches] = await db.query(GET_ARTIST_BY_ID_QUERY, [id]);

    if ((matches as RowDataPacket[]).length === 0) {
      throw new Error("No artist found with this id");
    }

    const artist = matches as RowDataPacket[][0];

    console.log({ artist });
    res.status(200).send(
      customResponse({
        message: "Successfully retrieved artist data",
        payload: artist[0],
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
        message: "Error while getting artist",
        status: false,
      })
    );
  }
};

export const updateArtist = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const {
      name,
      dob,
      gender,
      address,
      first_release_year,
      no_of_albums_released,
    } = req.body;

    if (
      !name ||
      !dob ||
      !gender ||
      !address ||
      !first_release_year ||
      !no_of_albums_released
    ) {
      throw new Error("All fields are required");
    }

    await db.query(UPDATE_ARTIST_QUERY, [
      name,
      dob,
      gender,
      address,
      first_release_year,
      no_of_albums_released,
      id,
    ]);

    res.status(200).send(
      customResponse({
        message: "Artist updated successfully",
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
        message: "Error while updating artist",
        status: false,
      })
    );
  }
};

export const deleteArtistById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await db.query(DELETE_ARTIST_BY_ID_QUERY, [id]);

    res.status(200).send(
      customResponse({
        message: `Successfully deleted artist`,
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
        message: "Error while deleting artist",
        status: false,
      })
    );
  }
};

export const getMusicByArtist = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { page = 1 } = req.query;
    const pageSize = 8;
    const offset = (parseInt(page as string) - 1) * pageSize;

    const [matches] = await db.query(SELECT_MUSIC_BY_ARTIST, [
      id,
      offset,
      pageSize,
    ]);

    const music = matches as RowDataPacket[][0];

    const [countRows] = await db.query(SELECT_TOTAL_MUSICS_BY_ARTIST, [id]);
    const total = countRows as RowDataPacket[];
    const totalCount = total[0].totalCount;

    res.status(200).send(
      customResponse({
        message: "Successfully retrieved music data",
        payload: { music, totalCount },
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
