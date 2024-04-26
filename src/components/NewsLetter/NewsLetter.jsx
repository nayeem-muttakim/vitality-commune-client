"use client";
import { Box, Button, TextField } from "@mui/material";
import toast from "react-hot-toast";

const NewsLetter = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
    if(e.target.email.value){
        toast.success("Subscribed")
    }
  };
  return (
    <Box
      display={"grid"}
      alignItems={"center"}
      justifyContent={"center"}
      textAlign={"center"}
      gap={2}
      height={200}
      bgcolor={"#bce4de"}
    >
      <Box className=" text-center space-y-8">
        <h1 className=" text-3xl font-semibold">Subscribe to News Letter</h1>
        <p className="text-xl font-medium">
          You will be notified when new challenges and health tips arrives or
          any offer starts
        </p>
      </Box>
      <form
        onSubmit={handleSubscribe}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <TextField
          variant="outlined"
          placeholder="Email"
          required
          name="email"
        />
        <Button type="submit" variant="contained">
          Subscribe
        </Button>
      </form>
    </Box>
  );
};

export default NewsLetter;
