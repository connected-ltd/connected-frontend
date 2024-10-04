import { Box, Typography } from "@mui/material";
import infoBox from "../assets/images/infobox-bg.svg";
import exclamation from "../assets/icons/exclamation.svg";
import { useLocation } from "react-router-dom";

type Props = {
  heading: string;
  textOne: string;
  textTwo: string;
  textThree: string;
};

const CustomInstructionBox = ({
  heading,
  textOne,
  textTwo,
  textThree,
}: Props) => {
  const location = useLocation();

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
        backgroundImage: `url(${infoBox})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right bottom",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Box sx={{ marginTop: ".25em" }}>
          <img src={exclamation} alt="" style={{ width: "100%" }} />
        </Box>
        <Typography
          variant="body2"
          sx={{
            fontSize: "1rem",
            fontWeight: 700,
            textTransform: "uppercase",
          }}
        >
          {heading}
        </Typography>
      </Box>
      {location.pathname === "/class-quiz" ? (
        <Typography
          variant="body2"
          sx={{
            fontSize: ".9rem",
            fontWeight: 700,
            lineHeight: "1.8rem",
            color: "#000",
          }}
        >
          Taking Quizzes from school{" "}
          <Typography
            component="span"
            sx={{
              color: "#EC1E1E",
              fontweight: 800,
            }}
          >
            will affect
          </Typography>{" "}
          your points!
        </Typography>
      ) : (
        <Typography
          variant="body2"
          sx={{
            fontSize: ".9rem",
            fontWeight: 700,
            lineHeight: "1.8rem",
            color: "#27AE60",
          }}
        >
          {textOne}
        </Typography>
      )}
      <Typography
        variant="body2"
        sx={{ fontSize: ".9rem", fontWeight: 700, lineHeight: "1.8rem" }}
      >
        {textTwo}
      </Typography>
      <Typography
        variant="body2"
        sx={{ fontSize: ".9rem", fontWeight: 700, lineHeight: "1.8rem" }}
      >
        {textThree}
      </Typography>
    </Box>
  );
};

export default CustomInstructionBox;
