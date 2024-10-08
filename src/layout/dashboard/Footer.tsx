import { Box, Typography } from "@mui/material";

function Footer() {
  const currentYear = new Date().getFullYear().toString();
  return (
    <Box
      sx={{
        padding: "10px 15px",
        textAlign: "center",
        backgroundColor: "#F6F5F4",
        pb: "30px",
      }}
    >
      <Typography
        variant="body1"
        sx={{ fontSize: "12px", lineHeight: "12px", color: "grey" }}
      >
        &copy; {currentYear} ConnectED Technologies Ltd.
      </Typography>
    </Box>
  );
}

export default Footer;
