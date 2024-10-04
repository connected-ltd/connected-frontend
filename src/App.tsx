import { ThemeProvider } from "@mui/material";
import { theme } from "./styles/theme";
import Router from "./routers/Router";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  );
}

export default App;
