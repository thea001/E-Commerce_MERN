import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";
import productRouter from "./routes/productRoute";
import { seedInitialProducts } from "./services/productService";

const app=express();
const port = 2001;

app.use(express.json())

mongoose.connect("mongodb://localhost:27017/ecommerce")
.then(()=>console.log("Mongo connected"))
.catch((err) => console.log("Failed to connect",err));

// seed the products to database
seedInitialProducts();


app.use('/user', userRoute)
app.use('/product',productRouter)

app.listen(port,()=>{
    console.log(`Server is runing at : http://localhost:${port}`)
})