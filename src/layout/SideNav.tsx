import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Box, useTheme, Typography, SvgIcon, IconButton } from "@mui/material";
import { FilledButton } from "../custom-components/styled/styledButtons";
import { useDispatch } from "react-redux";
import React from "react";
import { logout } from "../pages/auth/authSlice";
//icons
import connectedLogo from "../assets/icons/connected-logo.svg";
import SideOverview from "../assets/icons/side-overview.svg?react";
// import SideNotes from "../assets/icons/side-notes.svg?react";
// import sideQUiz from "../assets/icons/side-quiz.svg?react";
// import sideQuestions from "../assets/icons/side-question.svg?react";
// import sideMedia from "../assets/icons/side-media.svg?react";
// import sideReview from "../assets/icons/side-review.svg?react";
import { Add, KeyboardArrowLeft } from "@mui/icons-material";

type Props = {
  drawerWidth: number;
  handleDrawerToggle: () => void;
  mobileOpen: boolean;
};

function SideNav({ drawerWidth, handleDrawerToggle, mobileOpen }: Props) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleLogout = () => {
    setIsLoading(true);
    dispatch(logout());
    navigate("/");
    setIsLoading(false);
  };

  const navItems = [
    {
      text: "Dashboard",
      icon: SideOverview,
      link: "/dashboard",
    },
    {
      text: "Add Number",
      icon: Add,
      link: "/add-number",
    },
    // {
    //   text: "Notes",
    //   icon: SideNotes,
    //   link: "/notes",
    // },
    // {
    //   text: "Quizzes",
    //   icon: sideQUiz,
    //   link: "/quizzes",
    // },
    // {
    //   text: "Questions",
    //   icon: sideQuestions,
    //   link: "/questions",
    // },
    // {
    //   text: "Media Library",
    //   icon: sideMedia,
    //   link: "/media-library",
    // },
    // {
    //   text: "Reviews",
    //   icon: sideReview,
    //   link: "/reviews",
    // },
  ];

  const drawer = (
    <Box sx={{ mx: 3 }}>
      <Box
        sx={{
          margin: "3em 0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Box sx={{ width: "9.7em" }}>
              <img
                src={connectedLogo}
                alt="connected logo"
                style={{ width: "100%", height: "auto" }}
              />
            </Box>
            <Typography
              variant="body2"
              sx={{
                fontSize: "0.75rem",
                fontWeight: 300,
                textTransform: "uppercase",
                marginTop: "1em",
              }}
            >
              Admin dashboard
            </Typography>
          </Box>
          <IconButton
            onClick={handleDrawerToggle}
            sx={{ display: { xs: "block", sm: "none" } }}
          >
            <KeyboardArrowLeft sx={{ color: "#95969D", cursor: "pointer" }} />
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "85%",
        }}
      >
        <List
          sx={{
            "& .MuiTypography-root": {
              fontSize: "16px",
              fontWeight: 700,
              lineHeight: "25px",
              color: "inherit",
            },
            "& a": {
              color: "#ffffff",
              textDecoration: "none",
              borderRadius: "8px",
              width: "100%",
            },
          }}
        >
          {navItems.map((item, index) => (
            <ListItem key={index} disablePadding sx={{ margin: "5px 0" }}>
              <Box
                component={NavLink}
                to={item.link}
                style={({ isActive }) =>
                  isActive
                    ? {
                        backgroundColor: theme.palette.primary.main,
                        color: "#fff",
                        borderRadius: "6px",
                      }
                    : {
                        color: "#6F6F67",
                      }
                }
              >
                <ListItemButton
                  onClick={handleDrawerToggle}
                  sx={{
                    color: "inherit",
                    gap: 2,
                  }}
                >
                  <Box>
                    {/* <img src={item.icon} alt="" style={{ width: "100%" }} /> */}
                    <SvgIcon
                      component={item.icon}
                      sx={{
                        color: location.pathname.includes(item.link)
                          ? "#fff"
                          : "#6F6F67",
                      }}
                    />
                  </Box>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </Box>
            </ListItem>
          ))}
        </List>
        <FilledButton
          sx={{
            width: "100%",
            borderRadius: "10px",
          }}
          type="submit"
          disabled={isLoading}
          onClick={handleLogout}
        >
          {isLoading ? "Loading..." : "LOGOUT"}
        </FilledButton>
      </Box>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: { sm: drawerWidth },
        flexShrink: { sm: 0 },
      }}
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            background: "white",
            border: "none",
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            background: "white",
            border: "none",
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

export default SideNav;
