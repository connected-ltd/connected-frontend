import { Box, Typography } from "@mui/material";

type Props = {
  key: number;
  icon: string;
  text: string;
  number: number;
};

const CustomUnclickableOverviewCard = ({ key, icon, text, number }: Props) => {
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
        minWidth: "18.2em",
      }}
      key={key}
    >
      <Box
        sx={{
          padding: ".5em .7em",
          backgroundColor: "#F4F6FAB2",
          borderRadius: "10px",
          marginBottom: ".5em",
          width: "3em",
        }}
      >
        <img src={icon} alt="" style={{ width: "100%" }} />
      </Box>
      <Typography variant="body2" sx={{ fontSize: "1rem", fontWeight: 500 }}>
        {text} ({number})
      </Typography>
    </Box>
  );
};

export default CustomUnclickableOverviewCard;
