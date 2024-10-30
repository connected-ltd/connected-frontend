import { Box } from "@mui/material";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import About from "./components/About";
import For from "./components/For";

const Landing = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        margin: "1em 0",
      }}
    >
      <Box sx={{ width: "96%" }}>
        <Header />
      </Box>
      <Box sx={{ width: "92%" }}>
        <Hero />
        <Features />
        <About />
        <For />
      </Box>
    </Box>
  );
};

export default Landing;
