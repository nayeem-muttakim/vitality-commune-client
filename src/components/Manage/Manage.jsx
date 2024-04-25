"use client";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../shared/Hooks/useAuth/page";
import useAxiosSecure from "../shared/Hooks/useAxiosSecure/page";
import { Box, Grid, Paper, Typography } from "@mui/material";
import {
  AspectRatio,
  Card,
  CardContent,
  CardOverflow,
  Divider,
} from "@mui/joy";
import Image from "next/image";
import BallotIcon from "@mui/icons-material/Ballot";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";

const Manage = () => {
  const auth = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: myChallenges = [], refetch } = useQuery({
    queryKey: [auth?.user?.email, "myChallenges"],
    queryFn: async () => {
      const res = await axiosSecure(
        `/challenges/mine?host=${auth?.user?.email}`
      );
      return res.data;
    },
  });
  return (
    <Box px={1}>
      {" "}
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
        <Typography variant="h4">Manage Challenges</Typography>
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
        {" "}
        {myChallenges?.map((challenge) => (
          <Card
            key={challenge?._id}
            sx={{ borderRadius: 0, width: 300, maxWidth: "100%" }}
          >
            <CardContent>
              <Typography level="body-xs">{challenge?.date_range}</Typography>
              <Typography level="title-lg">{challenge?.description}</Typography>
            </CardContent>
            <Card
              orientation="horizontal"
              size="sm"
              sx={{ bgcolor: "background.surface", borderRadius: 0, mb: 1 }}
            >
              <CardOverflow>
                <AspectRatio
                  ratio="1"
                  sx={{ minWidth: 70, "& img[data-first-child]": { p: 1.5 } }}
                >
                  <Image
                    width={300}
                    height={200}
                    src={challenge?.banner}
                    alt=""
                  />
                </AspectRatio>
              </CardOverflow>
              <CardContent>
                <Typography level="title-md">{challenge?.title}</Typography>
                <Typography level="body-sm">{challenge?.goals_milestone}</Typography>
              </CardContent>
            </Card>
            <CardOverflow
              variant="soft"
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 1,
                justifyContent: "space-around",
                py: 1,
                borderTop: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography
                startDecorator={<BallotIcon color="danger" />}
                level="title-sm"
              >
                13
              </Typography>
              <Divider orientation="vertical" />
              <Typography
                startDecorator={<CommentOutlinedIcon />}
                level="title-sm"
              >
                9
              </Typography>
              <Divider orientation="vertical" />
              <Typography
                startDecorator={<InboxOutlinedIcon />}
                level="title-sm"
              >
                32
              </Typography>
            </CardOverflow>
          </Card>
        ))}
      </Grid>
    </Box>
  );
};

export default Manage;
