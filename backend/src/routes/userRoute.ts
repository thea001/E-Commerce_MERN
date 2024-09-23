import express, { response } from 'express';
import { login, register } from '../services/userService';


const router = express.Router();

router.post("/register", async (request, response)=>{
    try {
        const {firstName,lastName,email,password}= request.body;
        const {statusCode,data} = await register({firstName,lastName,email,password});
            response.status(statusCode).json(data);
    } catch {
        response.status(500).send("Something Went Wrong !")

    }
    
});


router.post('/login' , async (request, response) => {
    try {
        const {email,password} = request.body ;
        const {statusCode,data}= await login({email,password});
        response.status(statusCode).json(data);
    } catch {
        response.status(500).send("Something Went Wrong !")

    }
  
});



export default router;