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
import { createObjectCsvWriter } from "csv-writer";
import csvParser from "csv-parser";
import * as fs from "fs";
import { validationResult } from "express-validator";

type IArtist = {
  ID: string;
  Name: string;
  "Date of Birth": string;
  Gender: string;
  Address: string;
  "First Release Year": string;
  "Number of Albums Released": number;
  "Created At": string;
  "Updated At": string;
};

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

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log({ errors: errors.array() });
      return res.status(400).send(
        customResponse({
          message: errors.array()[0]?.msg,
          status: false,
          payload: errors.array(),
        })
      );
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

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log({ errors: errors.array() });
      return res.status(400).send(
        customResponse({
          message: errors.array()[0]?.msg,
          status: false,
          payload: errors.array(),
        })
      );
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

export const exportArtistsToCSV = async (req: Request, res: Response) => {
  try {
    const [matches] = await db.query("SELECT * FROM artist");
    const artists = matches as RowDataPacket[];

    const csvFilePath = `./csv/artists${Date.now()}.csv`;
    console.log("dasd");
    const csvWriter = createObjectCsvWriter({
      path: csvFilePath,
      header: [
        { id: "id", title: "ID" },
        { id: "name", title: "Name" },
        { id: "dob", title: "Date of Birth" },
        { id: "gender", title: "Gender" },
        { id: "address", title: "Address" },
        { id: "first_release_year", title: "First Release Year" },
        { id: "no_of_albums_released", title: "Number of Albums Released" },
        { id: "created_at", title: "Created At" },
        { id: "updated_at", title: "Updated At" },
      ],
    });

    console.log("were");

    await csvWriter.writeRecords(artists);

    console.log("writng");

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=artists.csv");

    fs.createReadStream(csvFilePath).pipe(res);
  } catch (err) {
    if (err instanceof Error) {
      return res
        .status(400)
        .send(customResponse({ message: err?.message, status: false }));
    }
    res.status(400).send(
      customResponse({
        message: "Error while export csv",
        status: false,
      })
    );
  }
};

export const importArtistFromCSV = async (req: Request, res: Response) => {
  try {
    const filePath = req?.file?.path;

    const artists: IArtist[] = [];
    fs.createReadStream(filePath ?? "../uploads")
      .pipe(csvParser())
      .on("data", (row) => {
        artists.push(row);
      })
      .on("end", async () => {
        for (const artist of artists) {
          await db.query(CREATE_ARTIST, [
            artist?.Name,
            new Date(artist?.["Date of Birth"]),
            artist?.Gender,
            artist?.Address,
            artist?.["First Release Year"],
            artist?.["Number of Albums Released"],
          ]);
        }
        console.log("Imported artists successfully");
        res.sendStatus(200);
      });
  } catch (err) {
    if (err instanceof Error) {
      return res
        .status(400)
        .send(customResponse({ message: err?.message, status: false }));
    }
    res.status(400).send(
      customResponse({
        message: "Error while export csv",
        status: false,
      })
    );
  }
};
