import { Button } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import { auth, twitterProvider } from '../../config';
import { signInWithPopup, TwitterAuthProvider } from 'firebase/auth';

import React from 'react';
import { useRouter } from 'next/router';


const TwitterLoginButton = (() => { 
  const router = useRouter()
  const TwitterLogin = () => {
    signInWithPopup(auth, twitterProvider).then( async (result) => {
      const user = result.user
      localStorage.setItem('token', user.uid)
      router.push("/top")
      const userInitialData = {
        token: user.uid,
        username: user.displayName,
        email: user.email,
        icon: user.photoURL,
        password: "",
      }
    }).catch((error) => {
      console.log(error);
    })
  }  
  return (
    <Button sx={{p:1.5, borderRadius:"5px", backgroundColor:"#1D9BF0", color:"white", textTransform:"none"}} variant="contained" startIcon={<TwitterIcon />}  onClick={TwitterLogin} >
      Login with Twitter
    </Button>
  );
})

export default TwitterLoginButton;