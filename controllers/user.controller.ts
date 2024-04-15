import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../database";
import { CREATE_USER, FIND_USER_WITH_EMAIL } from "../queries/user.queries";
import { customResponse } from "../utils/customResponse";
import { RowDataPacket } from "mysql2/promise";

export const userRegister = async (req: Request, res: Response) => {
  try {
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

    const existingUser = await db.query(FIND_USER_WITH_EMAIL, [email]);

    if (existingUser[0] instanceof Array && existingUser[0].length > 0) {
      // If the user exists, return error
      throw new Error("User already exists with this email");
    }

    //converting password to hashed password
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(CREATE_USER, [
      first_name,
      last_name,
      email,
      hashedPassword,
      phone,
      dob,
      gender,
      address,
    ]);

    //finding created user
    const [matches] = await db.query(FIND_USER_WITH_EMAIL, [email]);

    const userData = (matches as RowDataPacket[])[0];

    //creating token based on id and name
    const token = jwt.sign(
      { _id: userData?.id, name: userData?.first_name },
      process.env.JWT_SECRET_KEY!,
      {
        expiresIn: "2 days",
      }
    );

    res.status(200).send(
      customResponse({
        message: "User created successfully",
        payload: { token, userId: userData?.id, name: userData?.first_name },
      })
    );
  } catch (err) {
    if (err instanceof Error) {
      return res
        .status(400)
        .send(customResponse({ message: err?.message, status: false }));
    }
    res
      .status(400)
      .send(
        customResponse({ message: "Error while creating User", status: false })
      );
  }
};
