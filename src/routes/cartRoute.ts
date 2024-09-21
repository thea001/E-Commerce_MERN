import express from "express";
import { GetActiveCartForUser } from "../services/cartService";
import validateJwt from "../middlewares/validateJWT";



const router = express.Router();

router.get(
    '/',
    validateJwt, 
    async (req : any, res) => {
    const userId = req?.user?._id;

    const cart = await GetActiveCartForUser({userId: String(userId)});
    res.status(200).send(cart);

},
);









export default router;
