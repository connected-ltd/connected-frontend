import { Box, Typography } from "@mui/material";

type Props = {
  background: string;
  image: string;
  text: string;
  number: number;
};

const CustomOverviewRectangle = ({
  background,
  image,
  text,
  number,
}: Props) => {
  return (
    <Box
      sx={{
        borderRadius: "6px",
        backgroundColor: "#fff",
        padding: "2em 1.5em",
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
        flexDirection: "column",
        width: "100%",
        minWidth: "1.2em",
        border: "1px solid #D8D8D8",
        backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right bottom",
      }}
    >
      <Box sx={{ width: "3em" }}>
        <img src={image} alt="" style={{ width: "100%" }} />
      </Box>
      <Typography variant="body2" sx={{ fontSize: "1rem", fontWeight: 500 }}>
        {text} {number ? number : ""}
      </Typography>
    </Box>
  );
};

export default CustomOverviewRectangle;
