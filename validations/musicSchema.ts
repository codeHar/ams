import { body } from "express-validator";

export const validateCreateMusic = [
  body("artistId")
    .notEmpty()
    .isInt()
    .withMessage("Artist ID must be an integer"),
  body("title").notEmpty().withMessage("Title is required"),
  body("album_name").optional(),
  body("genre").optional(),
];

export const validateUpdateMusic = [
  body("title").notEmpty().withMessage("Title is required"),
  body("album_name").optional(),
  body("genre").optional(),
];
