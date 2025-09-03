import { Box, FormControl, Grid2, Typography, useTheme } from "@mui/material";
import contactLogo from "../../../assets/icons/contact-logo.svg";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  StyledTextArea,
  StyledTextField,
} from "../../../custom-components/styled/styledInputs";
import { useThemeContext } from "../../../styles/ThemeContext";
import { FilledButton } from "../../../custom-components/styled/styledButtons";

const Contact = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      company: "",
      subject: "",
      message: "",
    },
    validationSchema: yup.object({
      name: yup.string().required("Required"),
      email: yup.string().required("Required"),
      company: yup.string().required("Required"),
      subject: yup.string().required("Required"),
      message: yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const { mode } = useThemeContext();
  const theme = useTheme();

  return (
    <Box sx={{ margin: "5em 0" }}>
      <Box id="contact">
        <Box sx={{ width: { xs: "100%", md: "30%" } }}>
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: "2rem", md: "2.3rem", lg: "2.5rem" },
              fontWeight: 800,
              color: theme.palette.text.primary,
            }}
          >
            Stay <span style={{ color: "#2085BE" }}>ConnectED</span> with our
            kickass team.
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontSize: { xs: ".9rem", md: "1rem" },
              margin: "2em 0",
              lineHeight: "30px",
              color: theme.palette.text.primary,
            }}
          >
            We would love to hear from you and discuss how we can help bring
            your digital ideas to life. Here are the different ways you can get
            in touch with us.
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{ width: { xs: "100%", md: "60%" } }}
          >
            <Grid2 container spacing={2}>
              <Grid2 size={{ xs: 12, md: 6 }}>
                <FormControl error fullWidth>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: { xs: ".8rem", md: "1rem" },
                      fontWeight: 600,
                      marginBottom: { xs: "1.5em", md: ".5em" },
                      textTransform: "uppercase",
                      color: theme.palette.text.primary,
                    }}
                  >
                    Name
                  </Typography>
                  <StyledTextField
                    id="name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    placeholder="Full Name"
                    sx={{
                      borderRadius: "50px",
                      border: mode === "light" ? "1px solid #000" : "none",
                    }}
                  />
                </FormControl>
              </Grid2>
              <Grid2 size={{ xs: 12, md: 6 }}>
                <FormControl error fullWidth>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: { xs: ".8rem", md: "1rem" },
                      fontWeight: 600,
                      marginBottom: { xs: "1.5em", md: ".5em" },
                      textTransform: "uppercase",
                      color: theme.palette.text.primary,
                    }}
                  >
                    Email
                  </Typography>
                  <StyledTextField
                    id="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    placeholder="email@example.com"
                    type="email"
                    sx={{
                      borderRadius: "50px",
                      border: mode === "light" ? "1px solid #000" : "none",
                    }}
                  />
                </FormControl>
              </Grid2>
              <Grid2 size={{ xs: 12, md: 6 }}>
                <FormControl error fullWidth>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: { xs: ".8rem", md: "1rem" },
                      fontWeight: 600,
                      marginBottom: { xs: "1.5em", md: ".5em" },
                      textTransform: "uppercase",
                      color: theme.palette.text.primary,
                    }}
                  >
                    Company
                  </Typography>
                  <StyledTextField
                    id="company"
                    name="company"
                    value={formik.values.company}
                    onChange={formik.handleChange}
                    placeholder="Company Name"
                    sx={{
                      borderRadius: "50px",
                      border: mode === "light" ? "1px solid #000" : "none",
                    }}
                  />
                </FormControl>
              </Grid2>
              <Grid2 size={{ xs: 12, md: 6 }}>
                <FormControl error fullWidth>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: { xs: ".8rem", md: "1rem" },
                      fontWeight: 600,
                      marginBottom: { xs: "1.5em", md: ".5em" },
                      textTransform: "uppercase",
                      color: theme.palette.text.primary,
                    }}
                  >
                    Subject
                  </Typography>
                  <StyledTextField
                    id="subject"
                    name="subject"
                    value={formik.values.subject}
                    onChange={formik.handleChange}
                    placeholder="How can we help?"
                    sx={{
                      borderRadius: "50px",
                      border: mode === "light" ? "1px solid #000" : "none",
                    }}
                  />
                </FormControl>
              </Grid2>
              <Grid2 size={{ xs: 12, md: 6 }}>
                <FormControl error fullWidth>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: { xs: ".8rem", md: "1rem" },
                      fontWeight: 600,
                      marginBottom: { xs: "1.5em", md: ".5em" },
                      textTransform: "uppercase",
                      color: theme.palette.text.primary,
                    }}
                  >
                    Message
                  </Typography>
                  <StyledTextArea
                    id="message"
                    name="message"
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Your message..."
                    rows={4}
                    sx={{
                      border: mode === "light" ? "1px solid #000" : "none",
                    }}
                  />
                </FormControl>
              </Grid2>
            </Grid2>
            <FilledButton
              sx={{
                textTransform: "uppercase",
                margin: { xs: "2em 0", md: "1em 0" },
                borderRadius: "50px",
                padding: "1.3em",
                fontSize: { xs: ".8rem", md: "1rem" },
              }}
              type="submit"
            >
              Send message
            </FilledButton>
          </Box>
          <Box sx={{ width: { xs: "100%", sm: "70%", md: "45%" } }}>
            <img src={contactLogo} style={{ width: "100%" }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Contact;
