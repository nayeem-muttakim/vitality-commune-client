"use client";
import useAxiosPublic from "@/components/shared/Hooks/useAxios/page";
import {
  AspectRatio,
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
} from "@mui/joy";
import { useQuery } from "@tanstack/react-query";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import BookmarkAdd from "@mui/icons-material/BookmarkAddOutlined";
import Image from "next/image";
import { Box, Grid, Paper, Typography } from "@mui/material";
const Challenges = () => {
  const axiosPublic = useAxiosPublic();
  const { data: challenges = [] } = useQuery({
    queryKey: ["challenges"],
    queryFn: async () => {
      const res = await axiosPublic("/challenges");
      return res.data;
    },
  });

  return (
    <Box px={2} my={3}>
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
          lg: "repeat(4,1fr)",
        }}
        gap={2}
      >
        {challenges?.map((challenge) => (
          <Card
            key={challenge?.title}
            variant="outlined"
            sx={{
              width: 320,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Image width={320} height={180} src={challenge?.banner} alt="" />
            </Box>
            <CardContent>
              <Typography level="title-lg">{challenge?.title}</Typography>
              <Typography level="body-sm">{challenge?.description}</Typography>
            </CardContent>
            <CardActions buttonFlex="0 1 120px">
              <IconButton
                variant="outlined"
                color="neutral"
                sx={{ mr: "auto" }}
              >
                <FavoriteBorder />
              </IconButton>
              <Button variant="outlined" color="neutral">
                View
              </Button>
              <Button variant="solid" color="primary">
                Join
              </Button>
            </CardActions>
          </Card>
        ))}
      </Grid>
    </Box>
  );
};

export default Challenges;
