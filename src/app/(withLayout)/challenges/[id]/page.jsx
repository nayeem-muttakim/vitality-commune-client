"use client";

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/components/shared/Hooks/useAxiosSecure/page";
import {
  AspectRatio,
  Box,
  Button,
  Card,
  CardContent,
  CardOverflow,
  Chip,
  Divider,
  Typography,
} from "@mui/joy";
import Image from "next/image";

const ChallengeDetail = ({ params }) => {
  const id = params?.id;
  const axiosSecure = useAxiosSecure();
  const { data: challenge = {} } = useQuery({
    queryKey: ["challenge"],
    queryFn: async () => {
      const res = await axiosSecure(`/challenge/${id}`);
      return res.data;
    },
  });

  return (
    <div>
      {" "}
      <Card
        variant="outlined"
        sx={{
          width: { xs: 280, sm: 500, md: 600, lg: 850 },
          mx: "auto",
          my: 10,
          
        }}
      >
        <CardOverflow>
          <AspectRatio ratio="2">
            <Image width={280} height={200} src={challenge?.banner} alt="" />
          </AspectRatio>
        </CardOverflow>
        <CardContent>
          <Typography level="title-lg">{challenge?.title}</Typography>
          <Chip variant="outlined" color="success">
            {challenge?.type?.value}
          </Chip>
        </CardContent>

        <CardOverflow variant="soft" sx={{ bgcolor: "background.level1" }}>
          <Divider inset="context" />
          <CardContent sx={{ display: { sm: "none" } }}>
            <Box>
              <Typography level="body-md" fontWeight="md" textColor="red">
                Duration
              </Typography>
              <Typography
                level="body-sm"
                fontWeight="md"
                textColor="text.secondary"
              >
                {challenge?.date_range}
              </Typography>
            </Box>
            <Divider orientation="vertical" />
            <Box>
              <Typography level="body-md" fontWeight="md" textColor="green">
                Description
              </Typography>
              <Typography
                level="body-sm"
                fontWeight="md"
                textColor="text.secondary"
              >
                {challenge?.description}
              </Typography>
            </Box>
            <Divider orientation="vertical" />
            <Box>
              <Typography level="body-md" fontWeight="md" textColor="blue">
                Goal
              </Typography>
              <Typography
                level="body-sm"
                fontWeight="md"
                textColor="text.secondary"
              >
                {challenge?.goals_milestone}
              </Typography>
            </Box>
            <Button
              variant="solid"
              size="md"
              color="primary"
              aria-label="Explore Bahamas Islands"
              sx={{ ml: "auto", alignSelf: "center", fontWeight: 600 }}
            >
              Participate
            </Button>
          </CardContent>
          {/* medium devices */}
          <CardContent
            sx={{ display: { xs: "none", sm: "flex" } }}
            orientation="horizontal"
          >
            <Box>
              <Typography level="body-md" fontWeight="md" textColor="red">
                Duration
              </Typography>
              <Typography
                level="body-sm"
                fontWeight="md"
                textColor="text.secondary"
              >
                {challenge?.date_range}
              </Typography>
            </Box>
            <Divider orientation="vertical" />
            <Box>
              <Typography level="body-md" fontWeight="md" textColor="green">
                Description
              </Typography>
              <Typography
                level="body-sm"
                fontWeight="md"
                textColor="text.secondary"
              >
                {challenge?.description}
              </Typography>
            </Box>
            <Divider orientation="vertical" />
            <Box>
              <Typography level="body-md" fontWeight="md" textColor="blue">
                Goal
              </Typography>
              <Typography
                level="body-sm"
                fontWeight="md"
                textColor="text.secondary"
              >
                {challenge?.goals_milestone}
              </Typography>
            </Box>

            <Button
              variant="solid"
              size="md"
              color="primary"
              aria-label="Explore Bahamas Islands"
              sx={{ ml: "auto", alignSelf: "center", fontWeight: 600 }}
            >
              Participate
            </Button>
          </CardContent>
        </CardOverflow>
      </Card>
    </div>
  );
};

export default ChallengeDetail;
