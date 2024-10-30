import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import MouseIcon from "@mui/icons-material/Mouse";
import EditIcon from "@mui/icons-material/Edit";
import CodeIcon from "@mui/icons-material/Code";
import citizensIcon from "../../../assets/icons/citizens-icon.svg";
import informationProviderIcon from "../../../assets/icons/information-provider-icon.svg";

const For = () => {
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
            }}
          >
            <Typography
              variant="h3"
              sx={{ fontSize: "2.5rem", fontWeight: 800 }}
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
              <ToggleButton value="providers" disableRipple>
                Information Providers
              </ToggleButton>
              <ToggleButton value="citizens" disableRipple>
                For Citizens
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Box
            sx={{
              backgroundColor: "#025692",
              borderRadius: "40px",
              padding: "5em",
              marginTop: "2em",
            }}
          >
            {view === "citizens" ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box sx={{ width: "37%" }}>
                  <Typography
                    sx={{
                      fontSize: "2rem",
                      fontWeight: 800,
                      marginBottom: ".8em",
                    }}
                  >
                    For Citizens
                  </Typography>
                  <Typography
                    sx={{
                      lineHeight: "30px",
                    }}
                  >
                    These are individuals who want to access important
                    information on topics that affect their lives such as
                    agriculture, education, finance, health and more. They can
                    use the platform to receive and reply to content via SMS.
                  </Typography>
                </Box>
                <Box>
                  <Box sx={{ width: "30em" }}>
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
                }}
              >
                <Box sx={{ width: "37%" }}>
                  <Typography
                    sx={{
                      fontSize: "2rem",
                      fontWeight: 800,
                      marginBottom: ".8em",
                    }}
                  >
                    For Information Providers
                  </Typography>
                  <Typography
                    sx={{
                      lineHeight: "30px",
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
                  <Box sx={{ width: "30em" }}>
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

        <Box sx={{ mt: 8 }}>
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: 500,
              mb: 1,
            }}
          >
            Stay ConnectED
          </Typography>
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: 400,
              mb: 3,
              opacity: 0.9,
            }}
          >
            with our kickass team.
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              startIcon={<MouseIcon />}
              sx={{
                borderRadius: "8px",
                padding: "8px 16px",
                textTransform: "none",
                backgroundColor: "#0078D4",
                "&:hover": {
                  backgroundColor: "#0067B5",
                },
              }}
            >
              Click
            </Button>
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              sx={{
                borderRadius: "8px",
                padding: "8px 16px",
                textTransform: "none",
                backgroundColor: "#0078D4",
                "&:hover": {
                  backgroundColor: "#0067B5",
                },
              }}
            >
              Ask to edit
            </Button>
            <Button
              variant="contained"
              startIcon={<CodeIcon />}
              sx={{
                borderRadius: "8px",
                padding: "8px 16px",
                textTransform: "none",
                backgroundColor: "#2D2D2D",
                "&:hover": {
                  backgroundColor: "#3D3D3D",
                },
              }}
            >
              {"</>"}
            </Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default For;
