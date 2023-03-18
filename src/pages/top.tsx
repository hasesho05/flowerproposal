import { Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Animation from "../components/Animation";
import { auth, db } from "../config";

const Top = () => {
  const router = useRouter()
  const [user, setUser] = useState<any>("");
  const [post, setPost] = useState<any>(null);
  const getRandomDocument = async () => {
    // 1. Firestore からすべてのドキュメントを取得します。
    const postRef = collection(db, "posts");
    const snapshot = await getDocs(postRef);
    const postArray:any[] = [];
  
    snapshot.forEach((doc) => {
      postArray.push({ id: doc.id, ...doc.data() });
    });
  
    // 2. ランダムなインデックスを生成し、対応するドキュメントを選択します。
    const randomIndex = Math.floor(Math.random() * postArray.length);
    const randomDocument = postArray[randomIndex];
  
    return randomDocument;
  };
  
  
  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((user) => {
      setUser(user);
      if(!user) {
        router.push("/login")
      }
    })
    getRandomDocument().then((randomDoc) => {
      console.log("ランダムなドキュメント: ", randomDoc);
      setPost(randomDoc)
    });
  
  },[]);
  
  return (
    <Animation>
      <Box sx={{backgroundColor:"#F3E8E2", overflow:"hidden"}}>
        <Box sx={{background:"url(abstract-shadow.png)", width:"100%", minHeight:"630px", borderRadius:"40%", transform:"translateY(-200px)", position:"absolute", top:0}}></Box>
          <Box sx={{justifyContent:"center", display:"flex", position:"relative", width:"100%"}}>
            <Image src="/Artboard.png" alt="top" width={250} height={340} />
          </Box>
        <Box sx={{display:"flex", width:"100%"}}>
          <Box sx={{justifyContent:"center", display:"flex", width:"100%", position:"relative", overflow:"hidden"}}>
            <Link href={`/message/${post?.id}`}>
              <Image src="/login/69.png" alt="top" width={350} height={350} style={{marginLeft:"100px"}}/>
            </Link>
          </Box>
        </Box>
        <Box sx={{width:"100%", backgroundSize:"contain", backgroundRepeat:"no-repeat", transform:"translateY(-100px)", justifyContent:"center"}}>
        <img className="login_img" src="/login/21.png" style={{position:"absolute", width:"600px", transform:"translate(-270px,-80px) rotate(-10deg)", left:"50%", zIndex:"-1"}}  />
          <Box display="flex" gap={2} justifyContent="center">
            <img src="/button/MyPage.png" style={{width:"100px", marginTop:"50px"}}/>
            <img src="/button/Message.png" style={{width:"100px", marginTop:"50px"}}/>
            <img src="/button/News.png" style={{width:"100px", marginTop:"50px"}}/>
          </Box>
          
        </Box>
        <Box sx={{display:"flex", width:"100%", justifyContent:"center"}}>
          <Typography sx={{color:"#9F8189", fontSize:"30px"}}>季節のメッセージ</Typography>
        </Box>
        <Box sx={{display:"flex", width:"100%", justifyContent:"center", marginTop:"20px"}}>
          <img src="/Topflower.png" style={{width:"350px"}}/>
        </Box>
        <Box sx={{display:"flex", width:"100%", justifyContent:"center"}}>
          <Typography sx={{color:"#9F8189", fontSize:"30px", mt:"50px", mb:"20px"}}>Link</Typography>
        </Box>
        <Box display="flex" gap={4} justifyContent="center">
          <img src="/button/TwitterButton.png" style={{width:"100px"}}/>
          <img src="/button/InstagramButton.png" style={{width:"92px", height:"92px"}}/>
        </Box>
        <br />
        <br />
      </Box>
    </Animation>
  );
}

export default Top;