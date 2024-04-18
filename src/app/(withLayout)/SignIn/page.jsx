"use client";
import { Button, Grid, Input, TextField, Typography } from "@mui/material";
import useAuth from "@/components/shared/Hooks/useAuth/page";
import Link from "next/link";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
const SignIn = () => {
  const { signIn } = useAuth();
  const handleLog = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const pass = e.target.pass.value;
    signIn(email, pass)
      .then((res) => {
        toast.success("Logged In");
        // navigate(from);
      })
      .catch((err) => {
        toast.error("Invalid Email or Password");
      });
  };
  return (
    <Grid
      px={1}
      sx={{ maxWidth: 600, mx: "auto", my: { xs: 3, md: 5, xl: 10 } }}
    >
      <Helmet>
        <title>Vitality Commune | Login</title>
      </Helmet>
      <Typography pt={2} textAlign={"center"} variant="h4">
        Login
      </Typography>
      <form onSubmit={handleLog}>
        <Grid sx={{ display: "grid", gap: 5, p: 5 }}>
          <TextField
            label="Email"
            variant="outlined"
            name="email"
            type="email"
            required
          />

          <TextField
            label="Password"
            variant="outlined"
            name="pass"
            type="password"
            required
          />

          <Button
            variant="contained"
            type="submit"
            sx={{
              px: { xs: 10, sm: 19 },
              py: 1,
              fontSize: { sx: 10, md: 18 },
            }}
          >
            Login
          </Button>
          <Typography>
            No account?{" "}
            <Link href="/SignUp" style={{ textDecoration: "none" }}>
              <Typography variant="span" sx={{ color: "#d4a373" }}>
                Create one
              </Typography>
            </Link>
          </Typography>
        </Grid>
      </form>
    </Grid>
  );
};

export default SignIn;
