import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import { useThemeContext } from "../../../styles/ThemeContext";
import { DarkMode, LightMode } from "@mui/icons-material";
import { useTheme } from "@mui/material";
import { FilledButton } from "../../../custom-components/styled/styledButtons";
import connectedLogoLight from "../../../assets/icons/connected-logo-light.svg";
import connectedLogoDark from "../../../assets/icons/connected-logo-dark.svg";
import flag from "../../../assets/icons/flag.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const drawerWidth = 240;
// const navItems = ["Home", "Services", "About", "Contact"];
const navItems = [
  { id: 1, name: "Home", component_id: "home" },
  { id: 2, name: "Services", component_id: "services" },
  { id: 3, name: "About", component_id: "about" },
  { id: 4, name: "Contact", component_id: "contact" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { mode, toggleColorMode } = useThemeContext();
  const theme = useTheme();
  const navigate = useNavigate();
  const handleLogin = () => navigate("login");

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const scrollToSection = (componentId: string) => {
    const element = document.getElementById(componentId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setMobileOpen(false);
    }
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ marginTop: "7em" }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: "10em" }}>
          <img
            src={mode === "light" ? connectedLogoLight : connectedLogoDark}
            alt="logo"
            style={{ width: "100%" }}
          />
        </Box>
      </Box>
      <Box sx={{ marginTop: "2em" }}>
        <List>
          {navItems.map((item) => (
            <ListItem key={item.id} disablePadding>
              <ListItemButton
                onClick={() => scrollToSection(item.component_id)}
              >
                <ListItemText
                  primary={item.name}
                  sx={{
                    textAlign: "left",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItemButton sx={{ textAlign: "left" }}>
            <ListItemText
              primary="Sign Up"
              sx={{
                textAlign: "left",
              }}
            />
          </ListItemButton>
          <ListItemButton onClick={handleLogin} sx={{ textAlign: "left" }}>
            <ListItemText
              primary="Login"
              sx={{
                textAlign: "left",
              }}
            />
          </ListItemButton>
          <ListItemButton
            onClick={toggleColorMode}
            sx={{ textAlign: "left", marginTop: "2em" }}
          >
            {mode === "dark" ? <LightMode /> : <DarkMode />}
          </ListItemButton>
        </List>
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        width: "100vw",
        zIndex: 1300,
        paddingX: "1em",
        paddingY: "1em",
        overflowX: "hidden",
        maxWidth: "1550px",
        margin: "0 auto",
      }}
    >
      {/* <CssBaseline /> */}
      <Box
        component="nav"
        sx={{
          backgroundColor: theme.palette.background.paper,
          boxShadow: "none",
        }}
      >
        <Box
          sx={{
            display: { xs: "flex" },
            justifyContent: "space-around",
            alignItems: "center",
            margin: { lg: "0 1em" },
          }}
        >
          <IconButton
            onClick={handleDrawerToggle}
            sx={{ display: { sm: "none" } }}
          >
            <MenuIcon sx={{ fontSize: "1.8rem" }} />
          </IconButton>
          <Box sx={{ width: "10em", minWidth: "7em" }}>
            <img
              src={mode === "light" ? connectedLogoLight : connectedLogoDark}
              alt="logo"
              style={{ width: "100%" }}
            />
          </Box>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box></Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: { md: 1 },
              }}
            >
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  sx={{
                    color: theme.palette.text.primary,
                    fontSize: { xs: ".6rem", md: ".7rem" },
                  }}
                  onClick={() => scrollToSection(item.component_id)}
                >
                  {item.name}
                </Button>
              ))}
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                sx={{
                  color: theme.palette.text.primary,
                  fontSize: { xs: ".6rem", md: ".7rem" },
                }}
              >
                Sign Up
              </Button>
              <FilledButton
                sx={{
                  fontSize: { xs: ".6rem", md: ".7rem" },
                  borderRadius: "30px",
                }}
                onClick={handleLogin}
              >
                Login
              </FilledButton>
              <IconButton onClick={toggleColorMode}>
                {mode === "dark" ? <LightMode /> : <DarkMode />}
              </IconButton>
            </Box>
          </Box>
          <Box
            sx={{
              display: { sm: "none", lg: "flex" },
              alignItems: "center",
              width: { xs: "3em", md: "4em" },
              marginLeft: "1em",
            }}
          >
            <img src={flag} style={{ width: "100%" }} />
          </Box>
        </Box>
      </Box>
      <Box>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: mode === "light" ? "#fff" : "#14324C",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default Header;
