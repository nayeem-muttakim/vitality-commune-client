"use client";
import { Button, Divider, Grid, TextField, Typography } from "@mui/material";
import Link from "next/link";

import useAuth from "@/components/shared/Hooks/useAuth/page";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { imageUpload } from "../../../components/Utils";
import Social from "../../../components/shared/Social";
import useAxiosPublic from "@/components/shared/Hooks/useAxios/page";
import { useState } from "react";

const SignUp = () => {
  const axiosPublic = useAxiosPublic();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const auth = useAuth();
  const router = useRouter();
  const handleReg = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent double submission
    setIsSubmitting(true);
    const name = e.target.name.value;
    const email = e.target.email.value;
    const pass = e.target.pass.value;
    const image = e.target.image.files[0];
    const toasted = toast.loading("Registering");

    try {
      //upload image
      const imageData = await imageUpload(image);
      // create user
      const result = await auth.signUp(email, pass);
      // user name and image
      await auth.updateInfo(name, imageData?.url);
      const userInfo = {
        name: name,
        email: email,
        role: "user",
      };
      await axiosPublic.post("/users", userInfo);

      setIsSubmitting(false);
      toast.success("Registration Successful", { id: toasted });
      router.push("/");
    } catch (err) {
      // console.log(err);
      setIsSubmitting(false);
      toast.error("Email Already in use", { id: toasted });
    }
  };

  return (
    <Grid px={1} sx={{ maxWidth: 600, mx: "auto", my: 10 }}>
      <Typography textAlign={"center"} pt={2} variant="h4">
        Create an account
      </Typography>
      <Social />
      <Divider sx={{ px: 5, pt: 4 }}>or</Divider>
      <form onSubmit={handleReg}>
        <Grid sx={{ display: "grid", gap: 5, p: 5 }}>
          <TextField label="Name" name="name" type="text" required />

          <TextField name="image" type="file" required />
          <TextField label="Email" name="email" type="email" required />

          <TextField label="Password" name="pass" type="password" required />

          <Button
            variant="contained"
            type="submit"
            sx={{
              px: { xs: 10, sm: 19 },
              py: 1,
              fontSize: { sx: 10, md: 18 },
            }}
          >
            Register
          </Button>
          <Typography>
            Already have an account?{" "}
            <Link href="/SignIn" style={{ textDecoration: "none" }}>
              <Typography variant="span" sx={{ color: "#d4a373" }}>
                Login
              </Typography>
            </Link>
          </Typography>
        </Grid>
      </form>
    </Grid>
  );
};

export default SignUp;
