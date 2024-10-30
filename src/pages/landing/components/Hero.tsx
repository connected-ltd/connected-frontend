import { Box, Typography } from "@mui/material";
import map from "../../../assets/icons/map.svg";
import { FilledButton } from "../../../custom-components/styled/styledButtons";

const Hero = () => {
  return (
    <Box sx={{ marginTop: "5em" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        id="home"
      >
        <Box sx={{ width: "50%" }}>
          <Typography variant="h3" sx={{ fontSize: "3rem", fontWeight: 800 }}>
            Bridging Knowledge Gaps, Empowering All with{" "}
            <span style={{ color: "#2085BE" }}>Personalized AI Solutions</span>
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontSize: "1rem", margin: "1em 0", lineHeight: "30px" }}
          >
            In an era where personalized answers and tailored information are
            paramount, ConnectED stands as a beacon, leveraging cutting-edge AI
            technology to provide users with a unique and individualized
            experience.
          </Typography>
          <FilledButton
            sx={{ borderRadius: "50px", padding: "1em", fontSize: "1rem" }}
          >
            Open Account
          </FilledButton>
        </Box>
        <Box sx={{ width: "31em" }}>
          <img src={map} style={{ width: "100%" }} />
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;
