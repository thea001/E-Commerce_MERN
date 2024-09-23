import  Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField  from "@mui/material/TextField";
import { useRef, useState } from "react";
import { BASE_URL } from "../constants/baseUrl";
import { useAuth } from "../context/Auth/AuthContext";


const RegisterPage = () => {
   const [error, setError]=useState("")
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const PasswordRef = useRef<HTMLInputElement>(null);

    const {login} = useAuth();

    const onSubmit = async () => {
        const firstName = firstNameRef.current?.value;
        const lastName = lastNameRef.current?.value;
        const email = emailRef.current?.value;
        const password = PasswordRef.current?.value;

        //Validation data
if (!firstName || !lastName || !email || !password){
    setError('Check Submited data')
    return;
}

        //Make the call to api to create the user
        const response = await fetch (`${BASE_URL}/user/register`,{
            method:"POST",
            headers: {
                'content-Type' : 'application/json'
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                password,
            }),
        });

        if(!response.ok){
            setError("Unable to register user, please try difference creadientials !")
        }

        const token = await response.json();

        if(!token){
            setError("Incorrect token")
            return;
        }

    login(email, token)

    }

  return (
    <Container>
        <Box sx={ {display:"flex",flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
        <Typography variant="h4">Register New Account</Typography>
        <Box sx={{display:"flex", flexDirection:"column",gap: 2, mt:2, border:1,borderColor:"#f5f5f5", p:2 }}>
            <TextField inputRef={firstNameRef} label="Full Name" name="fullName"/>
            <TextField inputRef={lastNameRef} label="Last Name" name="lastName"/>
            <TextField inputRef={emailRef} label="Email" name="email"/>
            <TextField inputRef={PasswordRef} type = "password" label="Password" name="password"/>
            <Button onClick={onSubmit} variant="contained">Register</Button>
            {error && <Typography sx={{color:"red"}}>{error}</Typography>}
        </Box>
        </Box>
   
    </Container>
  );
};

export default RegisterPage;
