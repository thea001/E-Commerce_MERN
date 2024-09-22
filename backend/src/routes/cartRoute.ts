import express from "express";
import { addItemToCart, GetActiveCartForUser, updatedItemInCart,deleteItemInCart, clearCart, checkout } from "../services/cartService";
import validateJwt from "../middlewares/validateJWT";
import { ExtendRequest } from "../types/extendedRequest";



const router = express.Router();

router.get('/',validateJwt, async (req : ExtendRequest, res) => {

    try {
        const userId = req?.user?._id;
        const cart = await GetActiveCartForUser({userId: String(userId)});
        res.status(200).send(cart);
    } catch (err) {
        res.status(500).send("Something went Wrong")
    }
});

router.delete("/", validateJwt, async (req: ExtendRequest, res) => {

    try {
        const userId = req?.user?._id;
        const response = await clearCart({ userId })
        res.status(response.statusCode).send(response.data);

    } catch(err){
        res.status(500).send("Something went Wrong!")

    }
    
})


router.post('/items',validateJwt,async(req: ExtendRequest,res) =>{

    try {
        const userId = req?.user?._id;
        const {productId,quantity} = req.body;
        const response = await addItemToCart({userId,productId,quantity})
        res.status(response.statusCode).send(response.data)
    
    }

    catch (err){
        res.status(500).send("Something went wrong !")
    }
    })
   


router.put("/items" , validateJwt,async(req:ExtendRequest,res)=>{

    try{
        const userId = req?.user?._id;
        const {productId,quantity} = req.body;
        const response = await updatedItemInCart({userId, productId, quantity});
        res.status(response.statusCode).send(response.data);

    } catch(err){
        res.status(500).send("Something went wrong !")

    }

   
});


router.delete("/items/:productId", validateJwt, async (req: ExtendRequest, res)=> {

    try {
        const userId = req?.user?._id;
        const { productId } = req.params;
        const response = await deleteItemInCart({ userId, productId });
        res.status(response.statusCode).send(response.data);
    } catch(err) {
        res.status(500).send("Something went wrong !")

    }


})

router.post("/checkout", validateJwt, async (req: ExtendRequest, res)=>{

    try {
        const userId = req?.user?._id;
        const {address} = req.body;
        const response = await checkout({ userId, address })
        res.status(response.statusCode).send(response.data);
    } catch (err){
        res.status(500).send("Something went wrong !")

    }


})







export default router;

