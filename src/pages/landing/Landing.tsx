import { CssBaseline } from "@mui/material";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import About from "./components/About";
import For from "./components/For";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { ThemeProviderWrapper } from "../../styles/ThemeContext";

const Landing = () => {
  return (
    <ThemeProviderWrapper>
      <CssBaseline />
      <div className="mt-4 max-w-[1550px] flex flex-col justify-center items-center ml-auto mr-auto">
        <div className="flex justify-center items-center w-full flex-col">
          <Header />
          <div className="w-11/12">
            <Hero />
            <Features />
            <About />
            <For />
            <Contact />
          </div>
          <Footer />
        </div>
      </div>
    </ThemeProviderWrapper>
  );
};

export default Landing;
