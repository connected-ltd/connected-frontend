import { Box, Typography } from "@mui/material";
type Props = {
  key?: string | number;
  onClick: () => void;
  title: string;
  icon: string;
};

const CustomOverviewCard = ({ onClick, title, icon }: Props) => {
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        padding: "2em 1.5em",
        width: "100%",
        minWidth: "18.2em",
        borderRadius: "6px",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
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
        <Typography
          variant="body2"
          sx={{ fontSize: { xs: ".9rem", md: "1rem" }, fontWeight: 500 }}
        >
          {title}
        </Typography>
      </Box>
    </Box>
  );
};

export default CustomOverviewCard;
