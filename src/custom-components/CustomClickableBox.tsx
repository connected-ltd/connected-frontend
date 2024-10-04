import { Box, Typography } from "@mui/material";

type Props = {
  image: string;
  text: string;
  handleClick: () => void;
};

const CustomClickableBox = ({ image, text, handleClick }: Props) => {
  return (
    <Box
      sx={{
        borderRadius: "6px",
        backgroundColor: "#fff",
        padding: "2em 1.5em",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        minWidth: "1.2em",
        border: "1px solid #D8D8D8",
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      <Box sx={{ width: "3em" }}>
        <img src={image} alt="" style={{ width: "100%" }} />
      </Box>
      <Typography
        variant="body2"
        sx={{ fontSize: "1em", fontWeight: 700, lineHeight: "1.8rem" }}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default CustomClickableBox;
