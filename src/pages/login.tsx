import { Box, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

import TwitterLoginButton from "../components/common/TwitterLoginButton";
import { auth } from "../config";
import { useAuthState } from "react-firebase-hooks/auth";
import { PrimaryButton } from "../components/common/PrimaryButton";
import { useRouter } from "next/router";



const Login = () => {
  const router = useRouter()
  const [mode, setMode] = useState(0)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const inputEmail = (e:any) => {
    setEmail(e.target.value)
  }

  const inputPassword = (e:any) => {
    setPassword(e.target.value)
  }

  const handleSignup = () => {

    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user
        if(user) {
          router.push("/top")
        }})
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        setMessage("Invalid email or password")
      });
    }

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user
        console.log(user);
        
        if(user) {
          const uid = user.uid
        }}).catch((error) => {
          const errorCode = error.code;
          console.log(errorCode);
          setMessage("Invalid email or password")
    });
  }

  return (
    <>
    {mode === 0 &&
    <Box sx={{background:"linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)), url(bg-signup.png)", height:"100vh", width:"100%", backgroundSize:"cover", backgroundPosition:"bottom right"}}>
    <Box sx={{p:"50px", pt:"100px"}}>
      <Stack spacing={2} sx={{mb:"20px"}}>
        <Typography variant="h1" sx={{fontSize:"30px", fontWeight:"bold"}}>Sign In</Typography>
        <Typography variant="h2" sx={{fontSize:"20px"}}>sign in to access your excersizes and saved music.</Typography>
      </Stack>
      
      <Stack spacing={2}>
        <TextField fullWidth label="Email Address" required onChange={(e)=> inputEmail(e)}/>
        <TextField fullWidth label="password" required type="password" onChange={(e)=>inputPassword(e)}/>
      </Stack>
      <Box sx={{display:"flex", width:"100%", justifyContent:"end"}}>
          <Typography sx={{mt:"5px", fontSize:"0.9rem" ,color:"gray", cursor:"pointer"}}>Forgot Password?</Typography>
      </Box>
      <Typography sx={{color:"red"}}>{message}</Typography>
      <Box sx={{display:"flex", justifyContent:"center"}}>
        <PrimaryButton onClick={handleSignIn} text={"LOGIN"}/>
      </Box>
      <Box sx={{display:"flex", width:"100%", justifyContent:"center"}}>
        <Typography sx={{mt:"5px", fontSize:"0.9rem" ,color:"gray"}}>Don&apos;t have an account?</Typography>
        <Typography sx={{mt:"5px", fontSize:"0.9rem" ,color:"black", cursor:"pointer", ml:"5px"}} onClick={()=>setMode(1)}>Sign Up</Typography>
      </Box>
      <Box sx={{display:"flex", justifyContent:"center", mt:"20px"}}>
        <TwitterLoginButton />
      </Box>
    </Box>
  </Box>
    }

    {mode === 1 &&
    <Box sx={{background:"linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)), url(bg-signup.png)", height:"100vh", width:"100%", backgroundSize:"cover", backgroundPosition:"bottom right"}}>
      <Box sx={{p:"50px", pt:"100px"}}>
        <Stack spacing={2} sx={{mb:"20px"}}>
          <Typography variant="h1" sx={{fontSize:"30px", fontWeight:"bold"}}>Sign Up</Typography>
          <Typography variant="h2" sx={{fontSize:"20px"}}>Sign up now for free and start meditating, and explore Medic.</Typography>
        </Stack>
        
        <Stack spacing={2}>
          <TextField fullWidth label="Name" />
          <TextField fullWidth label="Email Address" required onChange={(e)=>inputEmail(e)}/>
          <TextField fullWidth label="Password" required type="password" onChange={(e)=>inputPassword(e)}/>
        </Stack>
        <Typography sx={{color:"red"}}>{message}</Typography>
        <Box  onClick={handleSignup} sx={{display:"flex", justifyContent:"center"}}>
          <PrimaryButton  onClick={handleSignup} text={"SIGN UP"}/>
        </Box>
        <Box sx={{display:"flex", width:"100%", justifyContent:"center"}}>
          <Typography sx={{mt:"5px", fontSize:"0.9rem" ,color:"gray"}}>Already have an account?</Typography>
          <Typography sx={{mt:"5px", fontSize:"0.9rem" ,color:"black", cursor:"pointer", ml:"5px"}} onClick={()=>setMode(0)}>Sign In</Typography>
        </Box>
        <Box sx={{display:"flex", justifyContent:"center", mt:"20px"}}>
          <TwitterLoginButton />
        </Box>
      </Box>
    </Box>
    }
    
    </>
  );
}

export default Login;