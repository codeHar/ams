import { body } from "express-validator";

export const validateCreateArtist = [
  body("name").notEmpty().withMessage("Name is required"),
  body("dob").isISO8601().withMessage("Invalid date format for date of birth"),
  body("gender").isIn(["m", "f", "o"]).withMessage("Invalid gender"),
  body("address").notEmpty().withMessage("Address is required"),
  body("first_release_year")
    .isInt({ min: 1900, max: new Date().getFullYear() })
    .withMessage("Invalid first release year"),
  body("no_of_albums_released")
    .isInt({ min: 0 })
    .withMessage("Number of albums released must be a positive integer"),
];
