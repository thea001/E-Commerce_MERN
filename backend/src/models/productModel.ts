import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  title: string;
  image: string;
  price: number;
  stock: number;
  category: mongoose.Types.ObjectId; // Reference to Category document
}

const productSchema = new Schema<IProduct>({
  title: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true, default: 0 },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" }, // Reference to Category model
});

const ProductModel = mongoose.model<IProduct>("Product", productSchema);

export default ProductModel;
