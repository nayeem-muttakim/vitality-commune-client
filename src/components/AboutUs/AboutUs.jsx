import { Box, Grid, Paper, Typography } from "@mui/material";

const AboutUs = () => {
  return (
    <Box px={1} maxWidth={800} mx={"auto"} my={5}>
      <Paper
        square={false}
        sx={{
          px: 1,
          py: 2,
          mb: 3,
          mx: "auto",
          backgroundColor: "#cbf3f0",
          textAlign: "center",
        }}
        elevation={3}
      >
        <Typography variant="h4">About Us</Typography>
      </Paper>
      <Grid>
        <Typography
          variant="subtitle1"
          textAlign={"center"}
          fontWeight={600}
          mt={2}
          maxWidth={800}
          mx={"auto"}
        >
          Welcome to our community health and fitness challenge platform, where compassion
          meets connection. Our website is dedicated to facilitating the
          people of lovable health in need of healthy lives while  running
          challenges to help for their well-being.
        </Typography>
        
        <Typography 
        variant="subtitle1"
          textAlign={"center"}
          fontWeight={600}
          my={2}
          maxWidth={800}
          mx={"auto"}>
          Join us on this compassionate journey, where every click, challenge, and
          participation brings us one step closer to a world where everybody is healthy
          and fit . 
        </Typography>
      </Grid>
    </Box>
  );
};

export default AboutUs;
