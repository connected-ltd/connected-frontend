import { Dialog, Typography } from "@mui/material";
import { ReactNode, useEffect } from "react";

type Props = {
  open: boolean;
  variant: "success" | "error";
  message: string;
  icon?: ReactNode;
  actions?: ReactNode;
  handleClose: () => void;
  autoclose?: boolean;
};

const CustomAlert = ({
  open,
  variant,
  icon,
  actions,
  handleClose,
  autoclose,
}: Props) => {
  useEffect(() => {
    if (autoclose) setTimeout(handleClose, 3000);
  }, [autoclose, handleClose]);

  return (
    <Dialog fullWidth={true} open={open} onClose={handleClose}>
      {icon}
      <Typography>{variant}</Typography>
      <Typography>Your quiz has been scheduled successfully</Typography>
      {actions}
    </Dialog>
  );
};

export default CustomAlert;
