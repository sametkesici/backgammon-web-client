import { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useFormik } from "formik";
import { login } from "../api/axios";
import Alert from "@mui/material/Alert";

import * as Yup from "yup";
import useAuth from "./../hooks/useAuth";

export default function Login() {
  const navigate = useNavigate();

  const { auth, setAuth } = useAuth();
  const [user, setUser] = useState("");
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().max(255).required("Username is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: async () => {
      console.log({
        userName: formik.values.username,
        password: formik.values.password,
      });

      try {
        const response = await login({
          userName: formik.values.username,
          password: formik.values.password,
        });

        console.log(response);
        const id = response?.data?.id;
        const username = response?.data?.username;
        const roles = response?.data?.roles;
        setAuth({ id, roles, username });
        localStorage.setItem("username", JSON.stringify(username));
        console.log(auth);

        navigate("/");
        navigate(0);
      } catch (err) {
        localStorage.removeItem("username");
        console.log(err.response.data);
        setError(err.response.data.message);
      }
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
          <TextField
            error={Boolean(formik.touched.username && formik.errors.username)}
            fullWidth
            helperText={formik.touched.username && formik.errors.username}
            label="Username"
            margin="normal"
            name="username"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="username"
            value={formik.values.username}
            variant="outlined"
          />
          <TextField
            error={Boolean(formik.touched.password && formik.errors.password)}
            fullWidth
            helperText={formik.touched.password && formik.errors.password}
            label="Password"
            margin="normal"
            name="password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="password"
            value={formik.values.password}
            variant="outlined"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            color="primary"
            disabled={formik.isSubmitting}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          {error ? (
            <Alert sx={{ mt: 2, mb: 3 }} variant="outlined" severity="error">
              {error}
            </Alert>
          ) : null}

          <Grid container>
            <Grid item xs>
              <Link href="/password/reset" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
