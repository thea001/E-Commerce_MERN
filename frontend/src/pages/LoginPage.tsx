import  Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField  from "@mui/material/TextField";
import { useRef, useState } from "react";
import { BASE_URL } from "../constants/baseUrl";
import { useAuth } from "../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
   const [error, setError]=useState("")
    
    const emailRef = useRef<HTMLInputElement>(null);
    const PasswordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const {login} = useAuth();

    const onSubmit = async () => {
        const email = emailRef.current?.value;
        const password = PasswordRef.current?.value;

        //Validation data
if ( !email || !password){
    setError('Check Submited data')
    return;
}

        //Make the call to api to create the user
        const response = await fetch (`${BASE_URL}/user/login`,{
            method:"POST",
            headers: {
                'content-Type' : 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        if(!response.ok){
            setError("Unable to Login User, please try difference creadientials !")
        }

        const token = await response.json();

        if(!token){
            setError("Incorrect token")
            return;
        }

    login(email, token)
    navigate("/")

    }

  return (
    <Container>
        <Box sx={ {display:"flex",flexDirection:"column", justifyContent:"center", alignItems:"center", mt:4}}>
        <Typography variant="h6">Login To Your Account</Typography>
        <Box sx={{display:"flex", flexDirection:"column",gap: 2, mt:2, border:1,borderColor:"#f5f5f5", p:2 }}>
            <TextField inputRef={emailRef} label="Email" name="email"/>
            <TextField inputRef={PasswordRef} type = "password" label="Password" name="password"/>
            <Button onClick={onSubmit} variant="contained">Login</Button>
            {error && <Typography sx={{color:"red"}}>{error}</Typography>}
        </Box>
        </Box>
   
    </Container>
  );
};

export default LoginPage;
