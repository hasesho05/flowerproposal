import { Box } from '@mui/system'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { PrimaryButton } from '../components/common/PrimaryButton'

import { auth } from '../config'

export default function Home() {
  const [user, setUser] = useState<any>("");
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    })},[]);
  
  return (
    <Box sx={{my:"auto",background:"#F3E8E2", height:"100vh", width:"100%"}}>
      <Box sx={{justifyContent:"center", display:"flex", pt:"70px"}}>
        <Image src="/Artboard.png" alt="top" width={300} height={400}  />
      </Box>
      <Box sx={{justifyContent:"center", display:"flex", width:"100%"}}>
        <Link href="login" style={{textDecoration:"none", width:"270px"}}>
          <PrimaryButton text="START" />
        </Link>
      </Box>  
    </Box>
  )
}
