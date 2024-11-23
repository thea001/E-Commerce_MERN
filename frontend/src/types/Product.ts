import { Category } from "./Category";

export interface Product {
  _id: string;
  title: string;
  price: number;
  image: string;
  category: Category;
  name: string;
  oldPrice: number;
  rating: number;
  sale?: boolean;
  newProduct?: boolean;
}
