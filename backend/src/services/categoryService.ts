import CategoryModel, { ICategory } from "../models/categoryModel";

export const createCategory = async (categoryData: Partial<ICategory>) => {
  const category = new CategoryModel(categoryData);
  await category.save();
  return category;
};

export const getAllCategories = async () => {
  return await CategoryModel.find().populate("products");
};

export const getCategoryById = async (id: string) => {
  return await CategoryModel.findById(id).populate("products");
};

export const updateCategory = async (
  id: string,
  categoryData: Partial<ICategory>
) => {
  return await CategoryModel.findByIdAndUpdate(id, categoryData, { new: true });
};

export const deleteCategory = async (id: string) => {
  return await CategoryModel.findByIdAndDelete(id);
};
