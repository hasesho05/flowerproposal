import { Button } from "@mui/material";
import FolderIcon from '@mui/icons-material/Folder';

interface Props {
  text: string;
  onClick?: () => void;
}

export const PrimaryButton = (props:Props) => {
  const {text, onClick} = props;

  const buttonStyle = {
    mt:"30px", 
    backgroundColor:"#E89897", 
    color:"white", 
    p:"10px 30px", 
    borderRadius:"30px", 
    width:"190px",
    fontSize:"1.3rem",
    ":hover": {
      backgroundColor:"#E89897",
      color:"white",
    }
  }
  return (
    <Button onClick={onClick} sx={buttonStyle}>{text}</Button>
  );
}

const GlassButton = (props:Props) => {
  const {text} = props;

  const buttonStyle = {
    borderRadius:"20px", 
    backdropFilter:"grayscale(1)", 
    backgroundColor:"inherit"
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