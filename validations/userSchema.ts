import { body } from "express-validator";

export const validateRegisterUser = [
  body("first_name").notEmpty().withMessage("First name is required"),
  body("last_name").notEmpty().withMessage("Last name is required"),
  body("email").isEmail().withMessage("Invalid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("phone")
    .optional()
    .isMobilePhone("any")
    .withMessage("Invalid phone number"),
  body("dob").optional().isISO8601().withMessage("Invalid date of birth"),
  body("gender").optional().isIn(["m", "f", "o"]).withMessage("Invalid gender"),
  body("address").optional().notEmpty().withMessage("Address is required"),
];

export const validateCreateUser = [
  body("first_name").notEmpty().withMessage("First name is required"),
  body("last_name").notEmpty().withMessage("Last name is required"),
  body("email").isEmail().withMessage("Invalid email"),
  body("phone")
    .optional()
    .isMobilePhone("any")
    .withMessage("Invalid phone number"),
  body("dob").optional().isISO8601().withMessage("Invalid date of birth"),
  body("gender").optional().isIn(["m", "f", "o"]).withMessage("Invalid gender"),
  body("address").optional().notEmpty().withMessage("Address is required"),
];
