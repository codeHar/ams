import { Request, Response } from "express";
import { RowDataPacket } from "mysql2/promise";
import db from "../database";
import { CREATE_ARTIST, GET_ALL_ARTISTS } from "../queries/artist.queries";
import { customResponse } from "../utils/customResponse";

export const getAllArtists = async (req: Request, res: Response) => {
  try {
    const [matches] = await db.query(GET_ALL_ARTISTS);

    if ((matches as RowDataPacket[]).length === 0) {
      throw new Error("Currently there are no artists");
    }

    const users = matches as RowDataPacket[];

    console.log({ users });
    res.status(200).send(
      customResponse({
        message: "Retrieved artist list successfully",
        payload: users,
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
