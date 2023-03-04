import { AppBar, Avatar, Box, Toolbar } from "@mui/material";

const Header = () => {
  return (
    <Box flexGrow={1}>
      <AppBar position="static" sx={{backgroundColor:"#F3E8E2"}}>
        <Toolbar sx={{display:"flex", justifyContent:"space-between"}}>
          <img src="/header/Header.png"/>
          <Avatar />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;