"use client";
import { Textarea } from "@mui/joy";
import Select from "react-select";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import useAxiosSecure from "@/components/shared/Hooks/useAxiosSecure/page";
import useAuth from "@/components/shared/Hooks/useAuth/page";
import toast from "react-hot-toast";
import { imageUpload } from "@/components/Utils";
const Create = () => {
  const options = [
    { value: "Fitness", label: "Fitness" },
    { value: "Nutrition", label: "Nutrition" },
    { value: "Mental Wellness", label: "Mental Wellness" },
  ];
  const [selectedOption, setSelectedOption] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const handleChallenge = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent double submission
    setIsSubmitting(true);
    const title = e.target.title.value;
    const type = selectedOption;
    const description = e.target.description.value;
    const date_range = e.target.date_range.value;
    const goals_milestone = e.target.goals_milestone.value;
    const image = e.target.banner.files[0];
    const host = user?.email;

    try {
      //upload image
      const imageData = await imageUpload(image);
      const challengeInfo = {
        title,
        type,
        description,
        date_range,
        goals_milestone,
        banner: imageData?.url,
        host,
      };
      axiosSecure.post("/challenges", challengeInfo).then((res) => {
        if (res.data.insertedId) {
          setIsSubmitting(false);
          toast.success("Challenge Added");
        }
        // navigate("/dashboard/added-pets");
      });
    } catch (err) {
      setIsSubmitting(false);
      console.log(err);
    }
  };
  return (
    <Box px={1}>
      <Paper
        square={false}
        sx={{
          px: 4,
          py: 2,
          my: 2,
          mx: "auto",
          backgroundColor: "#cbf3f0",
        }}
        elevation={3}
      >
        <Typography variant="h4">Create Challenge</Typography>
      </Paper>
      <form onSubmit={handleChallenge}>
        <Grid
          sx={{
            display: "grid",
            gap: 2,
            p: 5,
            maxWidth: 600,
            mx: "auto",
            my: 10,
          }}
        >
          <TextField label="Title" name="title" required />
          <Select
            required
            placeholder="Challenge Type"
            name="type"
            options={options}
            onChange={setSelectedOption}
            defaultValue={selectedOption}
          />
          <Textarea
            minRows={3}
            maxRows={3}
            name="description"
            placeholder="Description"
            required
          />
          <TextField
            name="date_range"
            label="Date Range"
            placeholder="DD-MM-YYYY -- DD-MM-YYYY"
            required
          />
          <Textarea
            minRows={4}
            maxRows={4}
            name="goals_milestone"
            placeholder="Goals and Milestone"
            required
          />

          <TextField type="file" name="banner" required />
          <Button type="submit" variant="contained">
            Save and Publish
          </Button>
        </Grid>
      </form>
    </Box>
  );
};

export default Create;
