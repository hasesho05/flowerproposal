import FolderIcon from '@mui/icons-material/Folder';
import { Button } from '@mui/material';

interface Props {
  text: string;
}

const GlassButton = (props:Props) => {
  const {text} = props;

  const buttonStyle = {
    borderRadius:"20px", 
    backdropFilter:"blur(5px)", 
    backgroundColor:"inherit",
    fontWeight:"bold",
    fontSize:"1.1rem",
    p:"15px 20px",
    "&:hover": {
      backgroundColor:"rgba(255, 255, 255, 0.5)"
    },
    "&:active": {
      backgroundColor:"rgba(255, 255, 255, 0.5)"
    }
  }
  return (
    <Button 
      sx={buttonStyle}  
      variant="contained" 
      startIcon={<FolderIcon />}
      >
        {text}
      </Button>
  );
}

export default GlassButton;