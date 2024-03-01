import { StatusCodes } from "http-status-codes";
import Product from "../models/Product.js";
import { BadRequestError } from "../utils/custom_errors.js";
import { uploadImage } from "../utils/file_handler.js";

export const create_product = async (req, res) => {
  const { name, desc, store } = req.body;
  const url = await uploadImage(req, `/vastmart/products/store/${name}`);
  const product = await Product.create({ name, desc, store, image: url });
  if (!product)
    throw new BadRequestError("There was an error creating the product");
  res.status(StatusCodes.OK).json("");
};

export const fetch_products = async (req, res) => {
  const { id } = req.params;
  const stores = await Product.find({ store: id });
  if (!stores) throw new BadRequestError("Error loading the data");
  res.status(StatusCodes.OK).json({ stores });
};
