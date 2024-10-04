import { Box, Typography } from "@mui/material";
import cardHeaderImg from "../assets/icons/quiz-icon.svg";
import detailsCardHeader from "../assets/icons/details-card-header.svg";

type Props = {
  header: string;
  subHeading1: string;
  value1: string;
  subHeading2: string;
  value2: string;
  subHeading3: string;
  value3: string;
};

const DetailsCard = ({
  header,
  subHeading1,
  value1,
  subHeading2,
  value2,
  subHeading3,
  value3,
}: Props) => {
  return (
    <Box
      sx={{
        border: "1px solid #CCCCCC",
        backgroundColor: "#F9F9F9",
        margin: "2em 0",
        padding: "2em 3em",
        backgroundImage: `url(${detailsCardHeader})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right bottom",
        borderRadius: "6px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Box sx={{ width: "2em" }}>
          <img src={cardHeaderImg} style={{ width: "100%" }} />
        </Box>
        <Typography
          variant="body2"
          sx={{
            color: "#1E1E1E",
            fontWeight: 700,
            fontSize: "1.4rem",
            textTransform: "capitalize",
          }}
        >
          {header}
        </Typography>
      </Box>
      <Box
        sx={{
          marginTop: "2em",
          display: "flex",
          justifyContent: "space-between",
          width: "75%",
        }}
      >
        <Box>
          <Typography
            variant="body2"
            sx={{
              color: "#FCC21B",
              fontWeight: 700,
              fontSize: "1rem",
              lineHeight: "1.3em",
            }}
          >
            {subHeading1}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#1E1E1E",
              fontWeight: 400,
              fontSize: "1rem",
              lineHeight: "1.3em",
              marginTop: ".3    em",
            }}
          >
            {value1}
          </Typography>
        </Box>
        <Box>
          <Typography
            variant="body2"
            sx={{
              color: "#FCC21B",
              fontWeight: 700,
              fontSize: "1rem",
              lineHeight: "1.3em",
            }}
          >
            {subHeading2}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#1E1E1E",
              fontWeight: 400,
              fontSize: "1rem",
              lineHeight: "1.3em",
              marginTop: ".3    em",
            }}
          >
            {value2}
          </Typography>
        </Box>
        <Box>
          <Typography
            variant="body2"
            sx={{
              color: "#FCC21B",
              fontWeight: 700,
              fontSize: "1rem",
              lineHeight: "1.3em",
            }}
          >
            {subHeading3}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#1E1E1E",
              fontWeight: 400,
              fontSize: "1rem",
              lineHeight: "1.3em",
              marginTop: ".3    em",
            }}
          >
            {value3}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default DetailsCard;
