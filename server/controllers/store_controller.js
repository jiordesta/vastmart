import { StatusCodes } from "http-status-codes";
import Store from "../models/Store.js";
import { BadRequestError } from "../utils/custom_errors.js";
import { uploadImage } from "../utils/file_handler.js";

export const create_store = async (req, res) => {
  const { name, desc, category } = req.body;
  const { _id } = req.user;
  const url = await uploadImage(req, `/vastmart/stores/category/${name}`);
  const store = await Store.create({
    name,
    desc,
    category,
    image: url,
    owner: _id,
  });
  if (!store)
    throw new BadRequestError("There was an error creating your store");
  res.status(StatusCodes.OK).json({ store });
};

export const fetch_stores = async (req, res) => {
  const stores = await Store.find({});
  if (!stores) throw new BadRequestError("And Error occured getting stores");
  res.status(StatusCodes.OK).json({ stores });
};

export const fetch_store = async (req, res) => {
  const { id } = req.params;
  const store = await Store.findById(id);
  if (!store) throw new BadRequestError("There was an error loading the data");
  res.status(StatusCodes.OK).json({ store });
};
