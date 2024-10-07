import { Box } from "@mui/system";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { Button, IconButton, Typography } from "@mui/material";
import { KeyboardArrowLeft, Menu, TurnLeft } from "@mui/icons-material";

type Props = {
  drawerWidth: number;
  handleDrawerToggle: () => void;
};

function Main({ drawerWidth, handleDrawerToggle }: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box
      component="main"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        flexGrow: 1,
        minHeight: "100vh",
        flexDirection: "column",
        display: "flex",
      }}
    >
      <Box
        sx={{
          px: { xs: "15px", sm: "15px", md: "10px", lg: "45px" },
          py: { xs: "10px", sm: "45px" },
          background: "#F6F5F4",
          flex: 1,
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent:
              location.pathname.includes("/notes/") ||
              location.pathname.includes("/quizzes/") ||
              location.pathname.includes("/questions/") ||
              location.pathname.includes("/class-quiz/") ||
              location.pathname.includes("/media-library/")
                ? "space-between"
                : { xs: "space-between", sm: "end" },
            marginBottom: "3.5em",
            paddingTop: { xs: "2em", sm: "0" },
            alignItems: "center",
          }}
        >
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              ml: 0,
              display:
                location.pathname.includes("/notes/") ||
                location.pathname.includes("/quizzes/") ||
                location.pathname.includes("/questions/") ||
                location.pathname.includes("/class-quiz/") ||
                location.pathname.includes("/media-library/")
                  ? { xs: "none", md: "none" }
                  : { xs: "block", sm: "none", md: "none" },
              backgroundColor: "#FFFFFF",
              borderRadius: "6px",
            }}
          >
            <Menu sx={{ color: "#025692" }} />
          </IconButton>
          <Button
            sx={{
              textTransform: "capitalize",
              backgroundColor: "#fff",
              padding: { sm: "1em 1em 1em .5em", md: "1em 9em 1em 1em" },
              borderRadius: "8px",
              border: "1px solid #CDD0D5",
              display:
                location.pathname.includes("/notes/") ||
                location.pathname.includes("/quizzes/") ||
                location.pathname.includes("/questions/") ||
                location.pathname.includes("/class-quiz/") ||
                location.pathname.includes("/media-library/")
                  ? "flex"
                  : "none",
              "&:hover": {
                backgroundColor: "#F6F5F4",
              },
            }}
            disableRipple
            onClick={() => navigate(-1)}
          >
            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                alignItems: "center",
                gap: 1.5,
                width: "100%",
              }}
            >
              <KeyboardArrowLeft sx={{ fontWeight: 1000 }} />
              <Typography
                variant="body2"
                sx={{ fontSize: "1rem", fontWeight: 700, color: "#555555" }}
              >
                {location.pathname.includes("/notes/")
                  ? "Notes"
                  : location.pathname.includes("/quizzes/") ||
                    location.pathname.includes("/class-quiz/")
                  ? "Quizzes"
                  : location.pathname.includes("/media-library/")
                  ? "Media Library"
                  : "Questions"}
              </Typography>
            </Box>
            <Box sx={{ display: { sm: "none" } }}>
              <TurnLeft sx={{ fontWeight: 1000, fontSize: "1.3rem" }} />
            </Box>
          </Button>
          {/* <Link
            style={{
              border: "1px solid #fff",
              textDecoration: "none",
              // border: "none",
              textAlign: "center",
              // width: "100%",
              backgroundColor: "#fff",
              color: "#FCC21B",
              height: "100%",
              borderRadius: "8px",
              fontSize: "1em",
              fontWeight: 700,
              width: "12em",
            }}
            to="mailto:dev.schoola@gmail.com"
          >
            <Box sx={{ padding: { xs: ".5em", md: "1em" } }}>
              Leave us feedback
            </Box>
          </Link> */}
        </Box>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}

export default Main;
