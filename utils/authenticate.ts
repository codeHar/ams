import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { customResponse } from "./customResponse";

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader: string | undefined = req.headers["authorization"];
  const token: string | undefined = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send(
      customResponse({
        message: "Unauthorized",
        status: false,
      })
    );
  }

  if (!jwt.verify(token, process.env.JWT_SECRET_KEY!)) {
    return res.status(403).send(
      customResponse({
        message: "Failed to authenticate token",
        status: false,
      })
    );
  }

  next();
}
