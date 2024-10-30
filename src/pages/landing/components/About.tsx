import { Box, Typography } from "@mui/material";
import aboutIcon from "../../../assets/icons/about-icon.svg";

const About = () => {
  return (
    <Box sx={{ marginTop: "5em" }} id="home">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        id="about"
      >
        <Box sx={{ width: "42%" }}>
          <Typography variant="h3" sx={{ fontSize: "2.5rem", fontWeight: 800 }}>
            About <span style={{ color: "#2085BE" }}>ConnectED</span>
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontSize: "1rem", margin: "2em 0", lineHeight: "30px" }}
          >
            At its core, ConnectED serves as a centralized digital hub,
            connecting various organizations to a vast network where crucial
            updates andinformation can be seamlessly uploaded and disseminated.
            What sets ConnectED apart is its ability to deliver personalized
            content to users, ensuring that each individual receives information
            tailored to their specific needs and interests.
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontSize: "1rem", margin: "1em 0", lineHeight: "30px" }}
          >
            This platform goes beyond traditional means of communication by
            incorporating SMS functionality, enabling even those in remote,
            rural areas with limited internet access to stay informed. Whether
            it's agricultural insights, educational updates, financial
            advisories, or more, ConnectED transcends geographical barriers to
            bring timely and relevant information to diverse populations.
          </Typography>
        </Box>
        <Box sx={{ width: "28em" }}>
          <img src={aboutIcon} style={{ width: "100%" }} />
        </Box>
      </Box>
    </Box>
  );
};

export default About;
