import { Button } from '@mui/material'
import { Box } from '@mui/system'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <Box sx={{backgroundColor:"#F3E8E2", height:"100vh", width:"100%"}}>
      <Box sx={{justifyContent:"center", display:"flex"}}>
        <Image src="/Artboard.png" alt="top" width={300} height={400}  />
      </Box>
      <Box sx={{justifyContent:"center", display:"flex"}}>
        <Button sx={{mt:"30px", backgroundColor:"#E89897", color:"white", p:"10px 20px", borderRadius:"30px", width:"100px" }}>LOGIN</Button>
      </Box>  
    </Box>
  )
}
