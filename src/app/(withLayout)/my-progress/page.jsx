"use client";
import useAuth from "@/components/shared/Hooks/useAuth/page";
import PrivateRoute from "../../../components/PrivateRoute";
import useAxiosSecure from "@/components/shared/Hooks/useAxiosSecure/page";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import {
  AspectRatio,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Sheet,
  Typography,
} from "@mui/joy";
import Image from "next/image";
import { Paper } from "@mui/material";
import toast from "react-hot-toast";

const MyProgress = () => {
  const auth = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: myParticipations = [], refetch } = useQuery({
    queryKey: [auth?.user?.email, "myParticipations"],
    queryFn: async () => {
      const res = await axiosSecure(
        `/participations/mine?participant=${auth?.user?.email}`
      );
      return res.data;
    },
  });
  const { data: user = {} } = useQuery({
    queryKey: [auth?.user?.email, "user"],
    queryFn: async () => {
      const res = await axiosSecure(`/user/${auth?.user?.email}`);
      return res.data;
    },
  });

  const handleComplete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/participation/mine/${id}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            axiosSecure
              .patch(`/user/${user?.email}`, { points: user?.points + 10 })
              .then((res) => {
                if (res.data.modifiedCount > 0) {
                  toast.success("Challenge Completed");
                  refetch();
                }
              });
          }
        });
      }
    });
  };

  const handleQuit = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to quit?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/participation/${id}`).then((res) => {
          if (res.data.deletedCount) {
            Swal.fire({
              title: "Quitted",
              text: `Take care of your health`,
            });
            refetch();
          }
        });
      }
    });
  };
  return (
    <PrivateRoute>
      <Paper
        square={false}
        sx={{
          width: "50%",
          mx: "auto",
          textAlign: "center",
          px: 4,
          py: 2,
          my: 2,
          backgroundColor: "#cbf3f0",
        }}
        elevation={3}
      >
        <Typography fontSize={30}>My Progress</Typography>
      </Paper>
      <Box
        px={2}
        my={3}
        minHeight={"80vh"}
        py={5}
        display={"grid"}
        gridTemplateColumns={{
          xs: "repeat(1,1fr)",
          lg: "repeat(2,1fr)",
        }}
        gap={2}
      >
        {myParticipations?.map((participation) => (
          <Box
            key={participation?._id}
            sx={{
              width: "85%",
              mx: { xs: 0, sm: "auto" },
            }}
          >
            <Card
              orientation="horizontal"
              sx={{
                width: "100%",
                mx: "auto",
                flexWrap: "wrap",
                [`& > *`]: {
                  "--stack-point": "500px",
                  minWidth:
                    "clamp(0px, (calc(var(--stack-point) - 2 * var(--Card-padding) - 2 * var(--variant-borderWidth, 0px)) + 1px - 100%) * 999, 100%)",
                },
              }}
            >
              <AspectRatio
                flex
                ratio="1"
                maxHeight={182}
                sx={{ minWidth: 182 }}
              >
                <Image
                  width={300}
                  height={200}
                  src={participation?.banner}
                  alt=""
                />
              </AspectRatio>
              <CardContent>
                <Typography fontSize="xl" fontWeight="lg">
                  {participation?.host}
                </Typography>
                <Typography
                  level="body-sm"
                  fontWeight="lg"
                  textColor="text.tertiary"
                >
                  {participation?.description}
                </Typography>
                <Sheet
                  sx={{
                    bgcolor: "background.level1",
                    borderRadius: "sm",
                    p: 1.5,
                    my: 1.5,
                    display: "flex",
                    gap: 2,
                    "& > div": { flex: 1 },
                  }}
                >
                  <div>
                    <Typography level="body-xs" fontWeight="lg">
                      Type
                    </Typography>
                    <Typography fontWeight="lg">
                      {participation?.type?.value}
                    </Typography>
                  </div>
                  <Divider orientation="vertical" />
                  <div>
                    <Typography level="body-xs" fontWeight="lg">
                      Goal
                    </Typography>
                    <Typography fontWeight="lg">
                      {participation?.goals_milestone}
                    </Typography>
                  </div>
                  <Divider orientation="vertical" />
                  <div>
                    <Typography level="body-xs" fontWeight="lg">
                      Reward
                    </Typography>
                    <Typography fontWeight="lg">10 points</Typography>
                  </div>
                </Sheet>
                <Box
                  sx={{ display: "flex", gap: 1.5, "& > button": { flex: 1 } }}
                >
                  <Button
                    onClick={() => handleQuit(participation?._id)}
                    variant="outlined"
                    color="danger"
                  >
                    Quit
                  </Button>
                  {participation?.completed ? (
                    <Button variant="soft" color="success">
                      Completed
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleComplete(participation?._id)}
                      variant="soft"
                      color="primary"
                    >
                      Mark as Completed
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </PrivateRoute>
  );
};

export default MyProgress;
