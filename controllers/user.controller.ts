import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../database";
import {
  CREATE_USER,
  CREATE_USER_RECORD,
  DELETE_USER_BY_ID_QUERY,
  FIND_USER_WITH_EMAIL,
  GET_ALL_USERS,
  GET_USER_BY_ID_QUERY,
  SELECT_TOTAL_USERS,
  UPDATE_USER_QUERY,
} from "../queries/user.queries";
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

    res.status(200).send(
      customResponse({
        message: "User created successfully",
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

export const userLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("All fields are required");
    }

    //finding created user
    const [matches] = await db.query(FIND_USER_WITH_EMAIL, [email]);

    if ((matches as RowDataPacket[]).length === 0) {
      throw new Error("No User found with this email");
    }

    const userData = (matches as RowDataPacket[])[0];

    const isMatch = bcrypt.compareSync(password, userData.password);

    if (!isMatch) {
      throw new Error("Password is incorrect");
    }

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
        message: "User logged in successfully",
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
        customResponse({ message: "Error while logging User", status: false })
      );
  }
};

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const { page = 1 } = req.query;
    const pageSize = 8;
    const offset = (parseInt(page as string) - 1) * pageSize;
    const [matches] = await db.query(GET_ALL_USERS, [offset, pageSize]);

    if ((matches as RowDataPacket[]).length === 0) {
      throw new Error("Currently there are no users");
    }

    const users = matches as RowDataPacket[];

    const [countRows] = await db.query(SELECT_TOTAL_USERS);
    const total = countRows as RowDataPacket[];
    const totalCount = total[0].totalCount;

    console.log({ users });
    res.status(200).send(
      customResponse({
        message: "Retrieved user list successfully",
        payload: { users, totalCount },
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
        customResponse({ message: "Error while getting Users", status: false })
      );
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const [matches] = await db.query(GET_USER_BY_ID_QUERY, [id]);

    if ((matches as RowDataPacket[]).length === 0) {
      throw new Error("No user found with this id");
    }

    const user = matches as RowDataPacket[][0];

    console.log({ user });
    res.status(200).send(
      customResponse({
        message: "Successfully retrieved user data",
        payload: { ...user[0] },
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
        message: "Error while getting user",
        status: false,
      })
    );
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { first_name, last_name, email, phone, dob, gender, address } =
      req.body;

    if (
      !first_name ||
      !last_name ||
      !email ||
      !phone ||
      !dob ||
      !gender ||
      !address
    ) {
      throw new Error("All fields are required");
    }

    await db.query(CREATE_USER_RECORD, [
      first_name,
      last_name,
      email,
      phone,
      dob,
      gender,
      address,
    ]);

    res.status(200).send(
      customResponse({
        message: "User created successfully",
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

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { first_name, last_name, email, phone, dob, gender, address } =
      req.body;

    const { id } = req.params;

    if (
      !first_name ||
      !last_name ||
      !email ||
      !phone ||
      !dob ||
      !gender ||
      !address
    ) {
      throw new Error("All fields are required");
    }

    await db.query(UPDATE_USER_QUERY, [
      first_name,
      last_name,
      email,
      phone,
      dob,
      gender,
      address,
      id,
    ]);

    res.status(200).send(
      customResponse({
        message: "User updated successfully",
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
        customResponse({ message: "Error while updating User", status: false })
      );
  }
};

export const deleteUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await db.query(DELETE_USER_BY_ID_QUERY, [id]);

    res.status(200).send(
      customResponse({
        message: `Successfully deleted user`,
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
        message: "Error while deleting user",
        status: false,
      })
    );
  }
};
