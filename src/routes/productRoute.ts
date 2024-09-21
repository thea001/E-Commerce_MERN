import express  from "express";
import { getALLProduct } from "../services/productService";


const router = express.Router()

router.get('/',async (req,res) => {
    const products = await getALLProduct();
    res.status(200).send(products)
})


export default router;