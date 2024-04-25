"use client";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../shared/Hooks/useAuth/page";
import useAxiosSecure from "../shared/Hooks/useAxiosSecure/page";
import { Box, Grid, IconButton, Paper, Typography } from "@mui/material";
import {
  AspectRatio,
  Card,
  CardContent,
  CardOverflow,
  Divider,
} from "@mui/joy";
import Image from "next/image";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PlayCircleOutlinedIcon from "@mui/icons-material/PlayCircleOutlined";
import PauseCircleOutlinedIcon from "@mui/icons-material/PauseCircleOutlined";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
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
  const handlePause = (challenge) => {
    axiosSecure
      .patch(`/challenge/${challenge?._id}`, { pause: !challenge?.pause })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          toast.success(`Challenge ${challenge?.pause ? "Resumed" : "Paused"}`);
          refetch();
        }
      });
  };
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to Delete?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/challenge/${id}`).then((res) => {
          if (res.data.deletedCount) {
            Swal.fire({
              title: "Deleted",
              text: `Give others more challenge`,
            });
            refetch();
          }
        });
      }
    });
  };
  return (
    <Box px={1}>
      {" "}
      <Paper
        square={false}
        sx={{
          px: 1,
          py: 2,
          my: 2,
          mx: "auto",
          backgroundColor: "#cbf3f0",
        }}
        elevation={3}
      >
        <Typography variant="h5">Manage Challenges</Typography>
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
            sx={{ borderRadius: 0, minWidth: 240, mx: "auto" }}
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
                    width={240}
                    height={200}
                    src={challenge?.banner}
                    alt=""
                  />
                </AspectRatio>
              </CardOverflow>
              <CardContent>
                <Typography level="title-md">{challenge?.title}</Typography>
                <Typography level="body-sm">
                  {challenge?.goals_milestone}
                </Typography>
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
              {challenge?.pause ? (
                <IconButton>
                  {" "}
                  <PlayCircleOutlinedIcon
                    onClick={() => handlePause(challenge)}
                    color="success"
                  />
                </IconButton>
              ) : (
                <IconButton onClick={() => handlePause(challenge)}>
                  {" "}
                  <PauseCircleOutlinedIcon color="warning" />{" "}
                </IconButton>
              )}

              {/* <Divider orientation="vertical" />
              <IconButton>
                <EditOutlinedIcon color="primary" />
              </IconButton> */}
              <Divider orientation="vertical" />
              <IconButton onClick={() => handleDelete(challenge?._id)}>
                <DeleteForeverOutlinedIcon color="error" />
              </IconButton>
            </CardOverflow>
          </Card>
        ))}
      </Grid>
    </Box>
  );
};

export default Manage;
