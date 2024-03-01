import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema({
  name: { type: String },
  desc: { type: String },
  store: { type: mongoose.Types.ObjectId },
  image: { type: String },
});
export default mongoose.model("Product", ProductSchema);
