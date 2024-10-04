// import { Share } from "@mui/icons-material";
import { Box, Button, IconButton, Typography } from "@mui/material";
import React from "react";

type Props = {
  icon: string;
  title: string;
  details: string;
  date: string;
  action: string;
  logo: React.ReactNode;
  handleClick: () => void;
};

const CustomInfoCard = ({
  icon,
  title,
  details,
  date,
  action,
  logo,
  handleClick,
}: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: { xs: "1.3em .7em", md: "1.3em 2.5em" },
        backgroundColor: "#fff",
        width: "100%",
        border: "1px solid #DAD9D7",
        borderRadius: "11px",
        marginBottom: ".7em",
        gap: 1,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Box sx={{ width: "2.6em", minWidth: { xs: "1.8em", md: "2.4em" } }}>
          <img src={icon} alt="" style={{ width: "100%" }} />
        </Box>
        <Box sx={{ margin: { xs: "0.4em 0", md: "0 1em" } }}>
          <Typography
            variant="h4"
            sx={{
              fontSize: "1.15rem",
              fontWeight: 700,
              color: "#1E1E1E",
              textTransform: "capitalize",
            }}
          >
            {title}{" "}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontSize: { xs: ".75rem", md: "1.13rem" },
              fontWeight: 400,
              color: "#555555",
              margin: ".4em 0",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {details}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              fontSize: { xs: ".75rem", md: "1rem" },
              fontWeight: 400,
              color: "#9A9A9A",
            }}
          >
            {date}{" "}
          </Typography>
        </Box>
      </Box>
      <Box>
        <Button
          sx={{
            backgroundColor: "#F6F5F4",
            padding: ".5em 2.7em",
            borderRadius: "6px",
            color: "#FCC21B",
            textTransform: "capitalize",
            "&:hover": {
              backgroundColor: "#F6F5F4",
            },
            display: { xs: "none", md: "block" },
          }}
          onClick={handleClick}
        >
          {action}
        </Button>
        <IconButton
          sx={{
            padding: ".4em",
            color: "#95969D",
            textTransform: "capitalize",
            "&:hover": {
              backgroundColor: "#F6F5F4",
            },
            display: { xs: "block", md: "none" },
          }}
          onClick={handleClick}
        >
          {logo}
        </IconButton>
      </Box>
    </Box>
  );
};

export default CustomInfoCard;
