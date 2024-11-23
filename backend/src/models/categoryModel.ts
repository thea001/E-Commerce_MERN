import mongoose, { Schema, Document } from "mongoose";
import { IProduct } from "./productModel";

export interface ICategory extends Document {
  name: string;
  description: string;
  products: mongoose.Types.ObjectId[]; // Reference to Product documents
}

const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }], // Array of references to Product model
});

const CategoryModel = mongoose.model<ICategory>("Category", categorySchema);

export default CategoryModel;
