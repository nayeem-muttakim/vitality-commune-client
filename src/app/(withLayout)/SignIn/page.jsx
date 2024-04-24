"use client";
import {
  Button,
  Divider,
  Grid,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import useAuth from "@/components/shared/Hooks/useAuth/page";
import Link from "next/link";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Social from "../../../components/shared/Social";
import { useState } from "react";
const SignIn = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const auth = useAuth();
  const handleLog = (e) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent double submission
    setIsSubmitting(true);
    const email = e.target.email.value;
    const pass = e.target.pass.value;
    const toasted = toast.loading("Logging In");
    auth.signIn(email, pass)
      .then((res) => {
        setIsSubmitting(false);
        toast.success("Logged In", { id: toasted });

        router.push("/");
      })
      .catch((err) => {
        setIsSubmitting(false);
        toast.error("Invalid Email or Password",{id:toasted});
      });
  };
  return (
    <Grid
      px={1}
      sx={{ maxWidth: 600, mx: "auto", my: { xs: 3, md: 5, xl: 10 } }}
    >
    
      <Typography pt={2} textAlign={"center"} variant="h4">
        Login
      </Typography>
      <Social />
      <Divider sx={{ px: 5, pt: 4 }}>or</Divider>
      <form onSubmit={handleLog}>
        <Grid sx={{ display: "grid", gap: 5, p: 5 }}>
          <TextField
            label="Email"
      
            name="email"
            type="email"
            required
          />

          <TextField
            label="Password"
         
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
