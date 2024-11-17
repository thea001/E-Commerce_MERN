export interface Product {
  _id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  name: string;
  oldPrice: number;
  rating: number;
  sale?: boolean;
  newProduct?: boolean;
}
