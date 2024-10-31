import { Box, FormControl, Grid2, Typography } from "@mui/material";
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

  return (
    <Box sx={{ marginTop: "5em" }}>
      <Box id="contact">
        <Box sx={{ width: "30%" }}>
          <Typography variant="h3" sx={{ fontSize: "2.5rem", fontWeight: 800 }}>
            Stay <span style={{ color: "#2085BE" }}>ConnectED</span> with our
            kickass team.
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontSize: "1rem", margin: "2em 0", lineHeight: "30px" }}
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
          }}
        >
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{ width: "60%" }}
          >
            <Grid2 container spacing={2}>
              <Grid2 size={6}>
                <FormControl error fullWidth>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "1rem",
                      fontWeight: 600,
                      marginBottom: ".5em",
                      textTransform: "uppercase",
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
              <Grid2 size={6}>
                <FormControl error fullWidth>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "1rem",
                      fontWeight: 600,
                      marginBottom: ".5em",
                      textTransform: "uppercase",
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
              <Grid2 size={6}>
                <FormControl error fullWidth>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "1rem",
                      fontWeight: 600,
                      marginBottom: ".5em",
                      textTransform: "uppercase",
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
              <Grid2 size={6}>
                <FormControl error fullWidth>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "1rem",
                      fontWeight: 600,
                      marginBottom: ".5em",
                      textTransform: "uppercase",
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
              <Grid2 size={6}>
                <FormControl error fullWidth>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "1rem",
                      fontWeight: 600,
                      marginBottom: ".5em",
                      textTransform: "uppercase",
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
                margin: "1em 0",
                borderRadius: "50px",
                padding: "1.3em",
              }}
              type="submit"
            >
              Send message
            </FilledButton>
          </Box>
          <Box>
            <img src={contactLogo} style={{ width: "100%" }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Contact;
