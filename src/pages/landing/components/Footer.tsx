import { Box, Typography } from "@mui/material";
import facebookIcon from "../../../assets/icons/facebook.svg";
import twitterIcon from "../../../assets/icons/twitter.svg";
import linkedinIcon from "../../../assets/icons/linkedin.svg";
import instagramIcon from "../../../assets/icons/instagram.svg";
import { Link } from "react-router-dom";
import { Call, LocationOn, Mail } from "@mui/icons-material";
import connectedLogoDark from "../../../assets/icons/connected-logo-dark.svg";

const Footer = () => {
  const currentYear = new Date().getFullYear().toString();

  return (
    <Box
      sx={{
        backgroundColor: "#081F32",
        width: "100%",
      }}
    >
      <Box sx={{ padding: "3em 1.75em" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: { xs: "100%", md: "60%" },
            height: "250px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: { xs: "40%", md: "100%" },
            }}
          >
            <Typography
              variant="body2"
              sx={{ fontSize: { xs: ".7rem", md: "1rem" }, color: "#fff" }}
            >
              Stay Connected
            </Typography>
            {socialList.map((social) => (
              <Link
                to={social.link}
                target="_blank"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  color: "#fff",
                  textDecoration: "none",
                  // margin: ".8em 0",
                }}
              >
                <Box sx={{ width: "2.5em" }}>
                  <img src={social.icon} style={{ width: "100%" }} />
                </Box>
                <Typography
                  variant="body2"
                  sx={{ fontSize: { xs: ".7rem", md: "1rem" } }}
                >
                  {social.name}
                </Typography>
              </Link>
            ))}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              paddingBottom: ".8em",
              width: { xs: "50%", md: "100%" },
            }}
          >
            <Typography
              variant="body2"
              sx={{ fontSize: { xs: ".7rem", md: "1rem" }, color: "#fff" }}
            >
              Contact Us
            </Typography>
            <Link
              to="mailto:info@connectedai.net"
              target="_blank"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                color: "#fff",
                textDecoration: "none",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontSize: { xs: ".7rem", md: "1rem" },
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  wordBreak: "break-all",
                }}
              >
                <Mail sx={{ color: "#2085BE" }} /> info@connectedai.net
              </Typography>
            </Link>
            <Link
              to="tel:+2347035251445"
              target="_blank"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                color: "#fff",
                textDecoration: "none",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontSize: { xs: ".7rem", md: "1rem" },

                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Call sx={{ color: "#2085BE" }} /> +234 703 525 1445
              </Typography>
            </Link>
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                color: "#fff",
                textDecoration: "none",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontSize: { xs: ".7rem", md: "1rem" },

                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <LocationOn sx={{ color: "#2085BE" }} /> 44A Isa Kaita Road
                Ungwar Sarki Kaduna
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          borderTop: "1px solid #14324C",
          padding: ".8em 1.75em",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: { xs: "100%", md: "50%" },
            alignItems: "center",
          }}
        >
          <Box sx={{ width: { xs: "5em", sm: "7em", md: "9.7em" } }}>
            <img
              src={connectedLogoDark}
              alt="connected logo"
              style={{ width: "100%", height: "auto" }}
            />
          </Box>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: ".6rem", sm: ".65rem", md: ".7rem" },
              color: "grey",
            }}
          >
            &copy; {currentYear} ConnectED All rights reserved
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const socialList = [
  {
    id: 1,
    name: "Connectedai",
    link: "https://www.facebook.com/profile.php?id=61557326654563&mibextid=LQQJ4d",
    icon: facebookIcon,
  },
  {
    id: 2,
    name: "connected_ai",
    link: "https://x.com/connected_ai",
    icon: twitterIcon,
  },
  {
    id: 3,
    name: "ConnectED",
    link: "https://www.linkedin.com/company/connected-ai/",
    icon: linkedinIcon,
  },
  {
    id: 4,
    name: "connected_ai",
    link: "https://www.instagram.com/connected_ai?igsh=MTgxMmZtcDluZGVmcw%3D%3D&utm_source=qr",
    icon: instagramIcon,
  },
];

export default Footer;
