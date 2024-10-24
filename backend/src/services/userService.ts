import userModel from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { orderModel } from "../models/orderModel";


interface RegisterParams {
    firstName: string;
    lastName:string;
    email:string;
    password:string;
}

export const register = async ({firstName,lastName,email,password}:RegisterParams) => {
    
    const findUser = await userModel.findOne({email})
    if(findUser){
        return  {data: "User already exists!",statusCode:400};
    }

    const hashPassword = await bcrypt.hash(password,10)
    const newUser = new userModel({email, password:hashPassword, firstName, lastName});
    await newUser.save()

    return {data:generateJWT({firstName,lastName,email}), statusCode:200};
}





interface LoginParams {
    email : string;
    password: string;
}


export const login = async ({email,password }:LoginParams) => {
    const findUser = await userModel.findOne({email});

    if(!findUser){
        return {data: "Incorrect email OR password !",statusCode:400};
    }

    const passwordMatch = await bcrypt.compare(password, findUser.password)
    if(passwordMatch){
        return {data: generateJWT({
            email,
            firstName: findUser.firstName,
            lastName: findUser.lastName,
        }),
             statusCode:200,
            };
    }

    return {data: "Incorrect email OR password !",statusCode:400};
};


interface getMyOrdersParms {
    userId:string

}

export const getMyOrders = async({userId}:getMyOrdersParms) => {

    try{
        return {data: await orderModel.find({userId}),statusCode:200} 
    } catch (err) {
        throw err;
    }
} 


const generateJWT =(data:any )=> {
    return jwt.sign(data, process.env.JWT_SECRET || '')

}