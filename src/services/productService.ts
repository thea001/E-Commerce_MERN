import productModel from "../models/productModel";


export const  getALLProduct = async () => {
    return await productModel.find();
}


export const seedInitialProducts = async () => {
    const products = [
    { title: "Dell Laptop", image: "https://atechmall.pk/wp-content/uploads/2024/07/dell-g16-7630-16-i9-13900hx-32gb-1tb-ssd-rtx-4060-gaming-laptop.jpg", price: 1570, stock: 100 },
   
    ];

    const existingProducts = await getALLProduct();

    if (existingProducts.length === 0) {
    await productModel.insertMany(products);
    }
};
