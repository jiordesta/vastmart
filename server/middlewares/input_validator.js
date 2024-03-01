import { body, validationResult } from "express-validator";
import { BadRequestError } from "../utils/custom_errors.js";

import User from "../models/User.js";
import Store from "../models/Store.js";
import Product from "../models/Product.js";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validate_signup = withValidationErrors([
  body("name").notEmpty().withMessage("Name is required"),
  body("username")
    .notEmpty()
    .withMessage("Username is Required")
    .custom(async (username) => {
      const user = await User.findOne({ username });
      if (user) throw new BadRequestError(`${username} is already taken`);
    }),
]);

export const validate_signin = withValidationErrors([
  body("username").notEmpty().withMessage("Username is Required"),
  body("password").notEmpty().withMessage("Password is Required"), //add custom for security
]);

export const validate_create_store = withValidationErrors([
  body("name")
    .notEmpty()
    .withMessage("Name is Required")
    .custom(async (name) => {
      const store = await Store.findOne({ name });
      if (store) throw new BadRequestError(`${name} is already taken`);
    }),
  body("desc").notEmpty().withMessage("Description is Required"),
]);

export const validate_create_product = withValidationErrors([
  body("name")
    .notEmpty()
    .withMessage("Name is Required")
    .custom(async (name) => {
      const product = await Product.findOne({ name });
      if (product) throw new BadRequestError("Duplicated products detected");
    }),
  body("desc").notEmpty().withMessage("Description is Required"),
]);
