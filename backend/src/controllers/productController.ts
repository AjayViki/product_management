import { Request, Response } from "express";
import Product from "../models/Product";

export const getProducts = async (req: Request, res: Response) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json({ success: true, data: products });
};

export const getProductById = async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);
  if (!product)
    return res.status(404).json({ success: false, message: "Not found" });
  res.json({ success: true, data: product });
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body);

    return res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Invalid product data",
    });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product)
    return res.status(404).json({ success: false, message: "Not found" });
  res.json({ success: true, data: product });
};

export const deleteProduct = async (req: Request, res: Response) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product)
    return res.status(404).json({ success: false, message: "Not found" });
  res.json({ success: true, data: null, message: "Deleted" });
};
