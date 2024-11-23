import express from "express";
import * as CategoryService from "../services/categoryService";

const router = express.Router();

// Create a new category
router.post("/create", async (req, res) => {
  try {
    const category = await CategoryService.createCategory(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: "Error creating category", error });
  }
});

// Get all categories
router.get("/all", async (req, res) => {
  try {
    const categories = await CategoryService.getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
});

// Get a category by ID
router.get("/:id", async (req, res) => {
  try {
    const category = await CategoryService.getCategoryById(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Error fetching category", error });
  }
});

// Update a category
router.put("/update/:id", async (req, res) => {
  try {
    const updatedCategory = await CategoryService.updateCategory(
      req.params.id,
      req.body
    );
    if (!updatedCategory)
      return res.status(404).json({ message: "Category not found" });
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: "Error updating category", error });
  }
});

// Delete a category
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedCategory = await CategoryService.deleteCategory(req.params.id);
    if (!deletedCategory)
      return res.status(404).json({ message: "Category not found" });
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting category", error });
  }
});

export default router;
