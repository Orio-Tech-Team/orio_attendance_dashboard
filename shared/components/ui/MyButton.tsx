import { CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";

interface Props {
  isLoading?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

const MyButton = ({
  isLoading = false,
  children,
  className,
  type = "submit",
  onClick,
}: Props) => {
  return (
    <Button
      variant="contained"
      type={type}
      onClick={onClick}
      className={`h-[3.2rem] bg-primary hover:bg-primary ${className}`}
    >
      {isLoading ? <CircularProgress sx={{ color: "white" }} /> : children}
    </Button>
  );
};

export default MyButton;
