import { CssBaseline } from "@mui/material";
import Router from "./routers/Router";
import { ThemeProviderWrapper } from "./styles/ThemeContext";

function App() {
  return (
    <ThemeProviderWrapper>
      <CssBaseline />
      <Router />
    </ThemeProviderWrapper>
  );
}

export default App;
