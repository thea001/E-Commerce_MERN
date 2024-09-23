import productModel from "../models/productModel";


export const  getALLProduct = async () => {
    return await productModel.find();
}


export const seedInitialProducts = async () => {

    try {
        
        const products = [
            { title: "Dell Laptop", image: "https://i.dell.com/is/image/DellContent//content/dam/ss2/product-images/dell-client-products/notebooks/latitude-notebooks/13-3320/media-gallery/peripherals_laptop_latitude_3320_gallery_1.psd?fmt=pjpg&pscan=auto&scl=1&wid=3337&hei=2417&qlt=100,1&resMode=sharp2&size=3337,2417&chrss=full&imwidth=5000", price: 1570, stock: 10 },
            { title: "Assus Laptop", image: "https://spacenet.tn/181552-large_default/pc-portable-asus-vivobook-15-x1502va-i5-13gen-8go-512go-ssd-silver.jpg", price: 25000, stock: 20 },
            { title: "HP Laptop", image: "https://my-media.apjonlinecdn.com/catalog/product/cache/b3b166914d87ce343d4dc5ec5117b502/2/Q/2Q9Z8PA-1_T1678942910.png", price: 4000, stock: 8 },
            ];
        
            const existingProducts = await getALLProduct();
        
            if (existingProducts.length === 0) {
            await productModel.insertMany(products);
            }
        
    } catch (err) {
        console.error("Cannout see database", err);
    }

   
};
