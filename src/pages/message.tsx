import { Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import GlassButton from "../components/common/GlassButton";
import Layout from "../components/Layout";
import { auth } from "../config";

const Message = () => {
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
    <Layout>
      <Box sx={{backgroundColor:"#F3E8E2", overflow:"hidden",justifyContent:"center"}}>
        <Box sx={{display:"flex", width:"100%"}}>
          <Box sx={{justifyContent:"center", display:"flex", width:"100%", position:"relative", overflow:"hidden"}}>
            <Image src="/message/moon.png" alt="top" width={350} height={400} style={{marginLeft:"60px"}}/>
            <img src="/message/flower.png" style={{width:"180px", height:"260px", position:"absolute", transform:"translateY(40px)"}}/>
          </Box>
        </Box>
        <Box width="100%" display="flex">
          <Box sx={{mx:"auto",color:"#9F8189", background:"white", width:"90%", borderRadius:"20px 20px 0 0", alignItems:"center", display:"flex", flexDirection:"column", px:3}}>
            <Typography sx={{fontSize:"35px", mt:"30px", mb:"20px", color:"darkbrown"}}>アルストロメリア</Typography>
            <Typography sx={{fontWeight:"bold", fontSize:"20px", mb:"20px", borderBottom:"1px solid brown", pb:1}}>Lily of the Incas</Typography>
            <Typography sx={{fontSize:"20px", mt:"20px"}}>エキゾチック</Typography>
            <Typography sx={{fontSize:"20px"}}>凛々しさ</Typography>
            <Typography sx={{fontSize:"20px"}}>未来へのあこがれ</Typography>
            <br />
            <br />
            <Typography sx={{fontSize:"20px", color:"gray", mb:"3px"}}>強くいいなと思うこと</Typography>
            <Typography sx={{fontSize:"20px", color:"gray", mb:"3px"}}>すごく羨ましいと思う感情が</Typography>
            <Typography sx={{fontSize:"20px", color:"gray", mb:"3px"}}>あなたの「未来」にあるから</Typography>
            <Typography sx={{fontSize:"20px", color:"gray", mb:"3px"}}>とても欲しいのだとしたら？</Typography>
            <Typography sx={{fontSize:"20px", color:"gray", mb:"3px"}}>僻みや妬みなどの</Typography>
            <Typography sx={{fontSize:"20px", color:"gray", mb:"3px"}}>マイナスの感情に囚われないで</Typography>
            <Typography sx={{fontSize:"20px", color:"gray", mb:"3px"}}>純粋な未来への憧れを受け止めて</Typography>
            <Typography sx={{fontSize:"20px", color:"gray", mb:"3px"}}>あなたは受け取れます</Typography>
            <Typography sx={{fontSize:"20px", color:"gray", mb:"3px"}}>実現化できる、</Typography>
            <Typography sx={{fontSize:"20px", color:"gray", mb:"3px"}}>まずはそう強く</Typography>
            <Typography sx={{fontSize:"20px", color:"gray", mb:"3px"}}>ご自身を信じて あげてください</Typography>
            <br />
            <br />
          </Box> 
        </Box>
        <br />
        <br />
      </Box>
    </Layout>
  );
}

export default Message;