import express  from "express";
import { getALLProduct } from "../services/productService";


const router = express.Router()

router.get('/',async (req,res) => {
    try {
    const products = await getALLProduct();
    res.status(200).send(products)
  
    }catch {
        res.status(500).send("Something Went Wrong !")
        
    }
    
})


export default router;