import mongoose, { Schema, Document } from "mongoose";
import { CreateProductDTO } from "../types/product.types";

export interface IProduct extends CreateProductDTO, Document {}

const ProductSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: 500,
    },
    price: { type: Number, required: true, min: [0, "Price must be ≥ 0"] },
    quantity: {
      type: Number,
      required: true,
      min: [0, "Quantity must be ≥ 0"],
      default: 0,
    },
  },
  { timestamps: true },
);

export default mongoose.model<IProduct>("Product", ProductSchema);
