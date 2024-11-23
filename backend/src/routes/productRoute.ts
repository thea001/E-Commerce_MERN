import express from "express";
import { getALLProduct } from "../services/productService";
import ProductModel from "../models/productModel";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await getALLProduct();
    res.status(200).send(products);
  } catch {
    res.status(500).send("Something Went Wrong !");
  }
});

router.get("/all", async (req, res) => {
  try {
    const products = await ProductModel.find().populate("category", "name");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

// DELETE: Remove a product by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const product = await ProductModel.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/byId/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const products = await ProductModel.findOne({ _id: id });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { title, price, stock, image, category } = req.body;

  try {
    const product = await ProductModel.findByIdAndUpdate(
      id,
      { title, price, stock, image, category },
      { new: true }
    );

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Add a new product
router.post("/add", async (req, res) => {
  const { title, price, stock, image, category } = req.body;

  try {
    const newProduct = new ProductModel({
      title,
      price,
      stock,
      image,
      category,
    });
    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Fetch products by category
router.get("/by-category/:categoryId", async (req, res) => {
  try {
    const { categoryId } = req.params;
    const products = await ProductModel.find({ category: categoryId }).populate(
      "category",
      "name"
    );
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products by category:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
