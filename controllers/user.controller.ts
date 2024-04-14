import { Request, Response } from "express";
import db from "../database";
import { CREATE_USER } from "../queries/user.queries";
import { customResponse } from "../utils/customResponse";

export const createUser = async (req: Request, res: Response) => {
  try {
    console.log("deta", req.body);
    const {
      first_name,
      last_name,
      email,
      password,
      phone,
      dob,
      gender,
      address,
    } = req.body;

    if (
      !first_name ||
      !last_name ||
      !email ||
      !password ||
      !phone ||
      !dob ||
      !gender ||
      !address
    ) {
      throw new Error("All fields are required");
    }

    const existingUser = await db.query("SELECT * FROM user WHERE email = ?", [
      email,
    ]);

    // If the user exists, return error
    if (existingUser?.[0]) {
      throw new Error("User already exists with this email");
    }

    await db.query(CREATE_USER, [
      first_name,
      last_name,
      email,
      password,
      phone,
      dob,
      gender,
      address,
    ]);

    res.status(200).send(customResponse("User created successfully"));
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).send(customResponse(err?.message));
    }
    res.status(400).send(customResponse("Error while creating User"));
  }
};
