import express from "express";
import { addItemToCart, getActiveCartForUser, updateItemInCart,deleteItemIncart, clearCart, checkout } from "../services/cartService";
import validateJwt from "../middlewares/validateJWT";
import { ExtendRequest } from "../types/extendedRequest";



const router = express.Router();

router.get('/',validateJwt, async (req : ExtendRequest, res) => {

    try {
        const userId = req?.user?._id;
        const cart = await getActiveCartForUser({userId, populateProduct:true});
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
        const response = await updateItemInCart({userId, productId, quantity});
        res.status(response.statusCode).send(response.data);

    } catch(err){
        res.status(500).send("Something went wrong !")

    }

   
});


router.delete("/items/:productId", validateJwt, async (req: ExtendRequest, res)=> {

    try {
        const userId = req?.user?._id;
        const { productId } = req.params;
        const response = await deleteItemIncart({ userId, productId });
        res.status(response.statusCode).send(response.data);
    } catch(err) {
        res.status(500).send("Something went wrong !")

    }


})

router.post("/checkout", validateJwt, async (req: ExtendRequest, res) => {
    try {
        const userId = req?.user?._id;
        const { address } = req.body;

        // Log the request body to make sure the data is received
        console.log("Checkout request received:", { userId, address });

        // If the address is missing, respond with a 400 status
        if (!address) {
            return res.status(400).send("Address is required for checkout.");
        }

        const response = await checkout({ userId, address });

        // Check if the service returned an error
        if (response.statusCode !== 200) {
            return res.status(response.statusCode).send(response.data);
        }

        // Send the success response
        res.status(200).send(response.data);
    } catch (err) {
        // Log the error for troubleshooting
        console.error("Error during checkout:", err);
        res.status(500).send("Something went wrong on the server!");
    }
});







export default router;

