"use client";
import useAxiosPublic from "@/components/shared/Hooks/useAxios/page";
import { Button, Card, CardActions, CardContent } from "@mui/joy";
import { useQuery } from "@tanstack/react-query";
import DetailModal from "@/components/DetailModal/DetailModal";
import Image from "next/image";
import { Box, Grid, Paper, Typography } from "@mui/material";

import { useState } from "react";
import useAuth from "@/components/shared/Hooks/useAuth/page";
const Challenges = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const { data: challenges = [] } = useQuery({
    queryKey: ["challenges"],
    queryFn: async () => {
      const res = await axiosPublic("/challenges");
      return res.data;
    },
  });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
            </CardContent>
            <CardActions buttonFlex="120px">
              <Button onClick={handleOpen} variant="outlined" color="neutral">
                View
              </Button>

            {user ?   <Button variant="solid" color="primary">
                Participate
              </Button> : <Typography>
                Log in to participate
                </Typography>}
            </CardActions>
            <DetailModal
              challenge={challenge}
              open={open}
              handleClose={handleClose}
            />
          </Card>
        ))}
      </Grid>
    </Box>
  );
};

export default Challenges;
