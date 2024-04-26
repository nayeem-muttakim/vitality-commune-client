"use client";
import useAxiosPublic from "@/components/shared/Hooks/useAxios/page";
import { Button, Card, CardActions, CardContent, Chip } from "@mui/joy";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Box, Grid, Paper, Typography } from "@mui/material";

import useAuth from "@/components/shared/Hooks/useAuth/page";
import Link from "next/link";
import useAxiosSecure from "@/components/shared/Hooks/useAxiosSecure/page";
import toast from "react-hot-toast";
import { useState } from "react";
const Challenges = () => {
  const auth = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { data: challenges = [] } = useQuery({
    queryKey: ["challenges"],
    queryFn: async () => {
      const res = await axiosPublic("/challenges");
      const active = res.data.filter((act) => act.pause === false);
      return active;
    },
  });
  const handleParticipate = (challenge) => {
    if (isSubmitting) return; // Prevent double submission
    setIsSubmitting(true);
    const participationInfo = {
      title: challenge?.title,
      type: challenge?.type,
      description: challenge?.description,
      date_range: challenge?.data_range,
      goals_milestone: challenge?.goals_milestone,
      banner: challenge?.banner,
      host: challenge?.host,
      participant: auth?.user?.email,
      completed: false,
    };
    axiosSecure
      .post("/participations", participationInfo)
      .then((res) => {
        if (res.data.insertedId) {
          setIsSubmitting(false);
          toast.success("Challenge Accepted");
        }
      })
      .catch((err) => {
        setIsSubmitting(false);
        console.log(err);
      });
  };
  return (
    <Box px={2} my={3} minHeight={"80vh"}>
      <Paper
        square={false}
        sx={{
          width: "60%",
          mx: "auto",
          textAlign: "center",
          px: 4,
          py: 2,
          my: 2,
          backgroundColor: "#cbf3f0",
        }}
        elevation={3}
      >
        <Typography variant="h4">Challenges for You</Typography>
      </Paper>
      <Grid
        px={{ lg: 20 }}
        py={5}
        display={"grid"}
        gridTemplateColumns={{
          xs: "repeat(1,1fr)",
          sm: "repeat(2,1fr)",
          md: "repeat(3,1fr)",
          lg: "repeat(4,1fr)",
        }}
        gap={2}
      >
        {challenges?.map((challenge) => (
          <Card
            key={challenge?._id}
            variant="outlined"
            sx={{
              width: 300,
              mx: "auto",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Image width={300} height={180} src={challenge?.banner} alt="" />
            </Box>
            <CardContent>
              <Typography level="title-lg">{challenge?.title}</Typography>
              <Typography level="body-sm">{challenge?.description}</Typography>
              <Chip >10 Points</Chip>
            </CardContent>
            <CardActions buttonFlex="120px">
              <Link href={`/challenges/${challenge?._id}`}>
                <Button variant="outlined" color="neutral">
                  View
                </Button>
              </Link>

              {auth?.user ? (
                <Button
                  onClick={() => handleParticipate(challenge)}
                  variant="solid"
                  color="primary"
                >
                  Participate
                </Button>
              ) : (
                <Typography>Log in to participate</Typography>
              )}
            </CardActions>
          </Card>
        ))}
      </Grid>
    </Box>
  );
};

export default Challenges;
