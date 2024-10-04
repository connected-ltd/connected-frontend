import { Box, Typography } from "@mui/material";

interface Props {
  setOpenFeedbackDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const CustomFeedbackButton = ({ setOpenFeedbackDialog }: Props) => {
  return (
    <Box
      onClick={() => setOpenFeedbackDialog(true)}
      sx={{
        height: "56px",
        width: "221px",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#fff",
        cursor: "pointer",
        textDecoration: "none",
      }}
    >
      <Typography
        color="primary.main"
        sx={{
          fontSize: "16px",
          fontWeight: 700,
          lineHeight: "24px",
        }}
      >
        Leave us feedback
      </Typography>
    </Box>
  );
};

export default CustomFeedbackButton;
