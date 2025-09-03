import React, { useState } from "react";
import {
  Box,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  useTheme,
} from "@mui/material";
import citizensIcon from "../../../assets/icons/citizens-icon.svg";
import informationProviderIcon from "../../../assets/icons/information-provider-icon.svg";

const For = () => {
  const theme = useTheme();
  const [view, setView] = useState("citizens");

  const handleViewChange = (
    _event: React.MouseEvent<HTMLElement>,
    newView: string
  ) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  return (
    <Box>
      <Box sx={{ marginTop: "5em" }}>
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: "2rem", md: "2.3rem", lg: "2.5rem" },
                fontWeight: 800,
                marginBottom: { xs: ".5em", md: "0" },
                color: theme.palette.text.primary,
              }}
            >
              <span style={{ color: "#2085BE" }}>ConnectED</span> For:
            </Typography>

            <ToggleButtonGroup
              value={view}
              exclusive
              onChange={handleViewChange}
              aria-label="view selection"
              sx={{
                backgroundColor: "#025692",
                padding: ".5em",
                borderRadius: "50px",
                gap: 1,
                "& .MuiToggleButton-root": {
                  border: "none",
                  borderRadius: "50px",
                  color: "white",
                  padding: ".5em 1.5em",
                  textTransform: "none",
                  "&.Mui-selected": {
                    backgroundColor: "#14324C80",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#14324C80",
                    },
                  },
                  "&:hover": {
                    backgroundColor: "#14324C80",
                  },
                },
              }}
            >
              <ToggleButton
                value="providers"
                disableRipple
                sx={{ fontSize: { xs: ".7rem", md: ".8rem" } }}
              >
                Information Providers
              </ToggleButton>
              <ToggleButton
                value="citizens"
                disableRipple
                sx={{ fontSize: { xs: ".7rem", md: ".8rem" } }}
              >
                For Citizens
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Box
            sx={{
              backgroundColor: "#025692",
              borderRadius: "40px",
              padding: { xs: "2em", md: "2em 4em" },
              marginTop: "2em",
              textAlign: { xs: "center", md: "left" },
            }}
          >
            {view === "citizens" ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: { xs: "column", md: "row" },
                }}
              >
                <Box sx={{ width: { xs: "100%", md: "45%", lg: "37%" } }}>
                  <Typography
                    sx={{
                      fontSize: { xs: "1.3rem", md: "1.5rem", lg: "2rem" },
                      fontWeight: 800,
                      marginBottom: ".8em",
                      color: "#fff",
                    }}
                  >
                    For Citizens
                  </Typography>
                  <Typography
                    sx={{
                      lineHeight: "30px",
                      color: "#fff",
                      fontSize: { xs: ".9rem", md: "1rem" },
                    }}
                  >
                    These are individuals who want to access important
                    information on topics that affect their lives such as
                    agriculture, education, finance, health and more. They can
                    use the platform to receive and reply to content via SMS.
                  </Typography>
                </Box>
                <Box>
                  <Box
                    sx={{
                      width: { xs: "18em", sm: "21em", md: "23em", lg: "30em" },
                    }}
                  >
                    <img src={citizensIcon} style={{ width: "100%" }} />
                  </Box>
                </Box>
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: { xs: "column", md: "row" },
                }}
              >
                <Box sx={{ width: { xs: "100%", md: "45%", lg: "37%" } }}>
                  <Typography
                    sx={{
                      fontSize: { xs: "1.3rem", md: "1.5rem", lg: "2rem" },
                      fontWeight: 800,
                      marginBottom: ".8em",
                      color: "#fff",
                    }}
                  >
                    For Information Providers
                  </Typography>
                  <Typography
                    sx={{
                      lineHeight: "30px",
                      color: "#fff",
                      fontSize: { xs: ".9rem", md: "1rem" },
                    }}
                  >
                    These are organizations that have relevant and reliable
                    information to share with the public, such as government
                    agencies, NGOs, research institutes, media outlets, etc.
                    They can use the platform to upload and manage their
                    content, as well as to reach and engage with a wider and
                    more diverse audience.
                  </Typography>
                </Box>
                <Box>
                  <Box
                    sx={{
                      width: { xs: "18em", sm: "21em", md: "23em", lg: "30em" },
                    }}
                  >
                    <img
                      src={informationProviderIcon}
                      style={{ width: "100%" }}
                    />
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default For;
