import { Box, Typography } from "@mui/material";
import map from "../../../assets/icons/map.svg";
import { FilledButton } from "../../../custom-components/styled/styledButtons";

const Hero = () => {
  return (
    <Box sx={{ marginTop: "5em" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: { xs: "center", md: "space-between" },
          alignItems: "center",
          width: "100%",
          flexDirection: { xs: "column", md: "row" },
        }}
        id="home"
      >
        <Box
          sx={{
            display: { xs: "flex", md: "block" },
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: "2rem", md: "2.3rem", lg: "3rem" },
              fontWeight: 800,
            }}
          >
            Bridging Knowledge Gaps, Empowering All with{" "}
            <span style={{ color: "#2085BE" }}>Personalized AI Solutions</span>
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontSize: { xs: ".9rem", md: "1rem" },
              margin: "1em 0",
              lineHeight: "30px",
            }}
          >
            In an era where personalized answers and tailored information are
            paramount, ConnectED stands as a beacon, leveraging cutting-edge AI
            technology to provide users with a unique and individualized
            experience.
          </Typography>
          <FilledButton
            sx={{
              borderRadius: "50px",
              padding: "1em",
              fontSize: "1rem",
              margin: { xs: "1em 0", md: "0" },
            }}
          >
            Open Account
          </FilledButton>
        </Box>
        <Box
          sx={{
            width: { xs: "95%", sm: "80%", md: "50%" },
            marginTop: { xs: "2em", md: "0" },
          }}
        >
          <Box sx={{ width: { md: "24em", lg: "31em" } }}>
            <img src={map} style={{ width: "100%" }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;
