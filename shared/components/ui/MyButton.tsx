import { CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";

interface Props {
  isLoading: boolean;
  children: React.ReactNode;
  className?: string;
}

const MyButton = ({ isLoading, children, className }: Props) => {
  return (
    <Button
      variant="contained"
      type="submit"
      className={`h-[3.2rem] bg-primary hover:bg-primary ${className}`}
    >
      {isLoading ? <CircularProgress sx={{ color: "white" }} /> : children}
    </Button>
  );
};

export default MyButton;
