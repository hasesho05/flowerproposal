import { Box } from '@mui/system'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { PrimaryButton } from '../components/common/PrimaryButton'

import { auth } from '../config'

export default function Home() {
  const [user, setUser] = useState<any>("");
  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((user) => {
      setUser(user);
    })},[]);
  
  return (
    <Box sx={{my:"auto",background:"url(bg-gradient.png)", height:"100vh", width:"100%"}}>
      <Box sx={{justifyContent:"center", display:"flex"}}>
        <Image src="/Artboard.png" alt="top" width={300} height={400}  />
      </Box>
      <Box sx={{justifyContent:"center", display:"flex"}}>
        <Link href="login" style={{textDecoration:"none"}}>
          <PrimaryButton text="Sign In" />
        </Link>
      </Box>  
    </Box>
  )
}
