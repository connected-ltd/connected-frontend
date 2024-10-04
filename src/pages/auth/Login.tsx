import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Stack,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { StyledFilledInput } from "../../custom-components/styled/styledInputs";
import { FilledButton } from "../../custom-components/styled/styledButtons";
import { login } from "./authSlice";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
// import Curri from "../../assets/icons/curri.svg?react";
import { useLoginMutation } from "../../app/authApiSlice";

type LoginCredentials = {
  username: string;
  password: string;
};

function Login() {
  const [loginRequest, { isLoading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: yup.object({
      username: yup.string().required("Required"),
      password: yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      loginFn(values);
    },
  });

  const loginFn = async (values: LoginCredentials) => {
    try {
      const userData = await loginRequest(values).unwrap();
      dispatch(login(userData));
      // navigate("/lesson-plans");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.status === 401 || error.status === 404) {
        alert("Incorrect username or passsord");
      } else {
        alert("something went wrong");
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
      }}
    >
      <Box>
        <Box
          sx={{
            backgroundColor: "#FFF",
            pt: { xs: 10, md: 20 },
            mb: 4,
            height: { xs: "max-content", md: "100%" },
            width: { xs: "85%", md: "30%" },
            marginX: "auto",
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "20px",
              lineHeight: "20px",
              color: "#1E1E1E",
              textAlign: "center",
            }}
          >
            Sign in
          </Typography>
          <Stack
            gap={2.5}
            mt={4}
            component="form"
            onSubmit={formik.handleSubmit}
          >
            <FormControl error fullWidth>
              <StyledFilledInput
                autoFocus
                id="username"
                name="username"
                placeholder="Email"
                value={formik.values.username}
                onChange={formik.handleChange}
              />
              <FormHelperText variant="standard">
                {formik.touched.username && formik.errors.username}
              </FormHelperText>
            </FormControl>
            <FormControl error fullWidth>
              <Box sx={{ position: "relative" }}>
                <StyledFilledInput
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
                <Button
                  sx={{
                    backgroundColor: "transparent",
                    border: "none",
                    position: "absolute",
                    opacity: 0.5,
                    right: "-5px",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                  onClick={() => setShowPassword((prev) => !prev)}
                  disableRipple
                >
                  {showPassword ? (
                    <VisibilityOff sx={{ color: "#000" }} />
                  ) : (
                    <Visibility sx={{ color: "#000" }} />
                  )}
                </Button>
              </Box>
              <FormHelperText variant="standard">
                {formik.touched.password && formik.errors.password}
              </FormHelperText>
              <Typography
                sx={{
                  mt: 2,
                  fontSize: "15px",
                  textAlign: "center",
                  fontWeight: 700,
                  "& a": {
                    textDecoration: "none",
                    color: "primary.main",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  },
                }}
              >
                <Link to="/forgot-password">Forgot passsord?</Link>
              </Typography>
            </FormControl>

            <FilledButton type="submit" disabled={isLoading} sx={{ mt: 3 }}>
              {isLoading ? "Loading..." : "Log in"}
            </FilledButton>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
