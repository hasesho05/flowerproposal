// components/AdminPost.tsx
import React, { useEffect, useState } from "react";
import { uploadImage, createPost } from "../config/function";
import { Box, Typography, TextField, Button, Stack, Modal, IconButton } from "@mui/material";
import { useRouter } from "next/router";
import Image from "next/image";
import FlashMessage from "../components/FlashMessage";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { auth } from "../config";
import { textToLink } from "../utils/util";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';


const AdminPost: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>("");
  const [title, setTitle] = useState("");
  const [engTitle, setEngTitle] = useState("");
  const [headline, setHeadline] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<"success" | "error">("success");
  const [isPosted, setIsPosted] = useState(false);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    NProgress.start();
    setIsPosted(true);
    e.preventDefault();
    if (image) {
      const imageUrl = await uploadImage(image);
      setTimeout(() => {
        NProgress.done();
      }, 500);
      await createPost(title, engTitle, headline, content, imageUrl);
      setMessage("投稿しました");
      setSeverity("success");
      setOpen(true);

      setTitle("");
      setEngTitle("");
      setHeadline("");
      setContent("");
      setPreviewUrl(null);
      setIsPosted(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setPreviewUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((user) => {
      setUser(user);
      if(!user) {
        router.push("/top")
      }
    })
  },[]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        mx: "auto",
        color: "#9F8189",
        backgroundColor: "white",
        width: "90%",
        borderRadius: "20px 20px 0 0",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        px: 3,
        py: 5,
      }}
    >
      <Typography
        sx={{ fontSize: "35px", color: "darkbrown" }}
      >
        投稿画面
      </Typography>
      <Stack spacing={2} mb={3} display="flex" flexDirection="column" sx={{justifyContent:"center", width:"100%", maxWidth:"500px"}}>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
        <label htmlFor="image">
          <Button variant="contained" component="span">
            画像を選択
          </Button>
        </label>
        {previewUrl && (
          <Box sx={{width:"100%", display:"flex", justifyContent:"center"}}>
            <Box sx={{position:"relative", height:"100%", width:"100%", maxWidth:"200px", borderRadius:"50%"}}>
              <Image src={previewUrl} alt="プレビュー" width={1} height={1} layout="responsive" objectFit="cover" />
            </Box>
          </Box>
        )}
        <TextField
          label="タイトル"
          value={title}
          multiline
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
        <TextField
          label="英名"
          value={engTitle}
          multiline
          onChange={(e) => setEngTitle(e.target.value)}
          fullWidth
        />
        <TextField
          label="見出し"
          value={headline}
          multiline
          onChange={(e) => setHeadline(e.target.value)}
          fullWidth
        />
        <TextField
          label="内容"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          fullWidth
          multiline
          rows={4}
        />

      </Stack>
      <Box display="flex" gap={2}>
        <Button onClick={()=>setPreviewModalOpen(true)} variant="contained" >
          プレビュー
        </Button>
        <Button disabled={isPosted} type="submit" variant="contained">
          投稿
        </Button>
      </Box>
      {open && <FlashMessage message={message} severity={severity} open={open} setOpen={setOpen} />}
      {previewModalOpen && <PreviewModal title={title} engTitle={engTitle} headline={headline} content={content} previewUrl={previewUrl} previewModalOpen={previewModalOpen} handleClose={()=>setPreviewModalOpen(false)}/>}
    </Box>
  );
};

const PreviewModal = (props:any) => {
  const {title, engTitle, headline, previewUrl, content, previewModalOpen, handleClose} = props;
  const style = {
    position: 'absolute' as 'absolute',
    top: '0%',
    left: '50%',
    transform: 'translate(-50%)',
    width: {xs: "300px", sm: "400px", md: "500px"},
    height: "300px",
    overflow: "scroll",
  };


  return (
    <Box>
    <Modal
      open={previewModalOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={[{style}, {backgroundColor:"#F3E8E2", overflow:"scroll",justifyContent:"center"}]}>
        <Box sx={{width:"100%", overflow:"scroll", maxHeight:"700px"}}>
          <IconButton onClick={handleClose} sx={{position:"absolute", top:0, right:0, cursor:"pointer", zIndex:"100"}}>
            <HighlightOffIcon/>
          </IconButton>
          <Box sx={{display:"flex", width:"100%", overflow:"scroll"}}>
            <Box sx={{justifyContent:"center", display:"flex", width:"100%", position:"relative", overflow:"scroll"}}>
              <Image src="/message/moon.png" alt="top" width={350} height={400} style={{marginLeft:"60px"}}/>
              <img src={previewUrl ? previewUrl : ""} style={{width:"180px", height:"260px", position:"absolute", transform:"translateY(40px)"}}/>
            </Box>
          </Box>
          <Box width="100%" display="flex" sx={{overflow:"scroll"}}>
            <Box sx={{mx:"auto",color:"#9F8189", background:"white", maxWidth:"600px", width:"90%", borderRadius:"20px 20px 0 0", alignItems:"center", display:"flex", flexDirection:"column", px:3, overflow:"scroll"}}>
              <Typography sx={{fontSize:"35px", mt:"30px", mb:"20px", color:"darkbrown"}}>{title}</Typography>
              <Typography sx={{fontWeight:"bold", fontSize:"20px", mb:"20px", borderBottom:"1px solid brown", pb:1}}>{engTitle}</Typography>
              <Box sx={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", flexWrap:"nowrap"}}>
                <div style={{fontSize:"18px", marginBottom:"20px", lineHeight:"20px", textAlign:"center"}} dangerouslySetInnerHTML={{__html: textToLink(headline)}}></div>
                <br />
                <Box sx={{ display:'flex', flexDirection:'column', alignItems: 'center', fontSize: "18px", color: "gray", lineHeight: "26px", textAlign:"center"}} dangerouslySetInnerHTML={{__html: textToLink(content)}} />
                <br />
                <br />
              </Box>

            </Box> 
          </Box>
          <br />
          <br />
      </Box>
      </Box>
    </Modal>
  </Box>
  )
}

export default AdminPost;
