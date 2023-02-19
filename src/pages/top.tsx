import { Button, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import GlassButton from "../components/common/GlassButton";
import { auth } from "../config";

const Top = () => {
  const router = useRouter()
  const [user, setUser] = useState<any>("");
  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((user) => {
      setUser(user);
      if(!user) {
        router.push("/login")
      }
    })},[]);
  
  return (
    <Box sx={{backgroundColor:"#F3E8E2", height:"120vh"}}>
      <Box sx={{background:"url(abstract-shadow.png)", width:"100%", minHeight:"630px", borderRadius:"40%", transform:"translateY(-200px)"}}>
        <Box sx={{justifyContent:"center", display:"flex"}}>
          <Image src="/Artboard.png" alt="top" width={280} height={370} style={{transform:"translateY(200px)"}} />
        </Box>
      </Box>
      <Box sx={{justifyContent:"center", display:"flex", transform:"translateY(-180px)"}}>
        <Box sx={{backgroundImage: "linear-gradient(90deg, rgba(247, 93, 139, 1), rgba(254, 220, 64, 1))" ,display:"flex", borderRadius:"50%", width:"90px", p:"100px", boxShadow: "2px 4px 10px orange"}}>
          <Typography sx={{color:"white", fontSize:"1.5rem", position:"absolute", transform:"translate(-45px, -15px)"}}>おしえて</Typography>
        </Box>
      </Box>
      <Box sx={{backgroundImage:"url(unsplash.png)", backgroundSize:"cover", height:"100vh", width:"100%", justifyContent:"center", display:"flex", transform:"translateY(-168px)"}}>
        <Stack spacing={2} width="70%" mt={5}>
          <GlassButton text="My Page" />
          <GlassButton text="My Page" />
          <GlassButton text="コラム" />
          <GlassButton text="コラム" />
        </Stack>

      </Box>
    </Box>
  );
}

export default Top;