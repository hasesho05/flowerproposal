'use client';
import { Box, Stack, TextField, Typography } from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { PrimaryButton } from '../components/common/PrimaryButton';
import { auth } from '../config';

const Admin = () => {
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const inputEmail = (e:any) => {
    setEmail(e.target.value)
  }

  const inputPassword = (e:any) => {
    setPassword(e.target.value)
  }

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user
        router.push("/adminpost")
        if(user) {
          const uid = user.uid
        }}).catch((error) => {
          const errorCode = error.code;
          console.log(errorCode);
          setMessage("Invalid email or password")
    });
  }

  return (
    <Box sx={{backgroundColor:"F3E8E2", height:"100vh", width:"100%", position:"fixed"}}>
    <Box sx={{p:"50px", pt:"100px"}}>
      <Stack spacing={2}>
        <TextField fullWidth label="Email Address" required variant="filled" onChange={(e)=> inputEmail(e)}/>
        <TextField fullWidth label="password" required type="password" variant="filled" onChange={(e)=>inputPassword(e)}/>
      </Stack>
      <Typography sx={{color:"red"}}>{message}</Typography>
      <Box sx={{display:"flex", justifyContent:"center"}}>
        <PrimaryButton onClick={handleSignIn} text={"LOGIN"}/>
      </Box>
    </Box>
  </Box>
  );
}

export default Admin;