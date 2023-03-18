import { GetStaticPaths, GetStaticProps } from "next";
import { Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Animation from "../../components/Animation";
import Layout from "../../components/Layout";
import { auth, db } from "../../config";
import { textToLink } from "../../utils/util";

const Message = (props:any) => {
  const router = useRouter()
  const [user, setUser] = useState<any>("");
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((user) => {
      setUser(user);
      if(!user) {
        router.push("/login")
      }
    })},[]);

  useEffect(() => {
    if (post) {
      setLoading(false);
    }
  }, [post]);

  
  return (
    <Animation>
      <Layout>
          <Box sx={{backgroundColor:"#F3E8E2", overflow:"hidden",justifyContent:"center"}}>
            <Box sx={{display:"flex", width:"100%"}}>
              <Box sx={{justifyContent:"center", display:"flex", width:"100%", position:"relative", overflow:"hidden"}}>
                <Image src="/message/moon.png" alt="top" width={350} height={400} style={{marginLeft:"60px"}}/>
                <img src={props.post?.imageUrl} style={{width:"180px", height:"260px", position:"absolute", transform:"translateY(40px)"}}/>
              </Box>
            </Box>
            <Box width="100%" display="flex">
              <Box sx={{mx:"auto",color:"#9F8189", background:"white", width:"90%", maxWidth:"600px", borderRadius:"20px 20px 0 0", alignItems:"center", display:"flex", flexDirection:"column", px:3}}>
                <Typography sx={{fontSize:"35px", mt:"30px", mb:"20px", color:"darkbrown"}}>{props.post?.title}</Typography>
                <Typography sx={{fontWeight:"bold", fontSize:"20px", mb:"20px", borderBottom:"1px solid brown", pb:1}}>{props.post?.engTitle}</Typography>
                <Box sx={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", flexWrap:"nowrap"}}>
                  <div style={{fontSize:"18px", marginBottom:"20px", lineHeight:"22px", textAlign:"center"}} dangerouslySetInnerHTML={{__html: textToLink(props.post.headline)}}></div>
                  <br />
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: "18px", color: "gray", lineHeight: "26px", textAlign:"center"}} dangerouslySetInnerHTML={{__html: textToLink(props.post?.content)}} />
                  <br />
                  <br />
                </Box>

              </Box> 
            </Box>
            <br />
            <br />
        </Box>
      </Layout>
    </Animation>
  );
}

export default Message;

export const getStaticPaths: GetStaticPaths = async () => {
  const postCollection = collection(db, 'posts');
  const postSnapshot = await getDocs(postCollection);
  const paths = postSnapshot.docs.map((doc) => ({
    params: { customId: doc.id },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};


export const getStaticProps: GetStaticProps = async (context) => {
  if (!context.params) {
    return {
      notFound: true,
    };
  }
  const customId = context.params.customId as string; 
  const postRef = doc(db, 'posts', customId);
  const docSnapshot = await getDoc(postRef);
  let post;

  if (docSnapshot.exists()) {
    post = { id: docSnapshot.id, ...docSnapshot.data() };
  } else {
    console.log('No such document!');
    post = null;
  }

  return {
    props: {
      post,
    },
    revalidate: 60, // 60秒ごとに再生成
  };
};


