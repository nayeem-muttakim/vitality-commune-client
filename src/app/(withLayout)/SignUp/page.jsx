"use client";
import { Button, Divider, Grid, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { Helmet } from "react-helmet-async";
import useAuth from "@/components/shared/Hooks/useAuth/page";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { imageUpload } from "../../../components/Utils";
import Social from "../../../components/shared/Social";
import useAxiosPublic from "@/components/shared/Hooks/useAxios/page";

const SignUp = () => {
  const axiosPublic = useAxiosPublic();
  const { signUp, updateInfo } = useAuth();
  const router = useRouter();
  const handleReg = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const pass = e.target.pass.value;
    const image = e.target.image.files[0];
    try {
      //upload image
      const imageData = await imageUpload(image);
      // create user
      const result = await signUp(email, pass);
      // user name and image
      await updateInfo(name, imageData?.url);
      const userInfo = {
        name: name,
        email: email,
        role: "user",
      };
      await axiosPublic.post("/users", userInfo);
      router.push("/");
      toast.success("Registration Successful");
    } catch (err) {
      // console.log(err);
      toast.error("Email Already in use");
    }
  };

  return (
    <Grid px={1} sx={{ maxWidth: 600, mx: "auto", my: 10 }}>
      <Helmet>
        <title>Vitality Commune | Register</title>
      </Helmet>
      <Typography textAlign={"center"} pt={2} variant="h4">
        Create an account
      </Typography>
      <Social />
      <Divider sx={{ px: 5, pt: 4 }}>or</Divider>
      <form onSubmit={handleReg}>
        <Grid sx={{ display: "grid", gap: 5, p: 5 }}>
          <TextField
            label="Name"
            variant="outlined"
            name="name"
            type="text"
            required
          />

          <TextField variant="outlined" name="image" type="file" required />
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
