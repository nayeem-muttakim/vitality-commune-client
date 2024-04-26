"use client";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import Chip from "@mui/joy/Chip";
import Divider from "@mui/joy/Divider";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Typography from "@mui/joy/Typography";
import Check from "@mui/icons-material/Check";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Link from "next/link";
import useAuth from "../shared/Hooks/useAuth/page";

export default function CallToAction() {
  const auth = useAuth();
  return (
    <Box
      sx={{
        maxWidth: "60%",
        mx: "auto",
        my: 2,
      }}
    >
      <Card size="lg" variant="soft" color="warning">
        <Chip size="sm" variant="outlined" color="neutral">
          Healthy
        </Chip>
        <Typography level="h2">Stay Fit and Active</Typography>
        <Divider inset="none" />
        <List size="sm">
          <ListItem>
            <ListItemDecorator>
              <Check />
            </ListItemDecorator>
            Challenges for you to take part
          </ListItem>
          <ListItem>
            <ListItemDecorator>
              <Check />
            </ListItemDecorator>
            Create Challenges for others
          </ListItem>
          <ListItem>
            <ListItemDecorator>
              <Check />
            </ListItemDecorator>
            Leader Board for competition
          </ListItem>
          <ListItem>
            <ListItemDecorator>
              <Check />
            </ListItemDecorator>
            Stay Logged in to continue your Journey
          </ListItem>
        </List>
        <Divider inset="none" />
        <CardActions>
          <Typography level="title-lg" sx={{ mr: "auto" }}>
            10 points
            <Typography fontSize="sm" textColor="text.tertiary">
              / challenge
            </Typography>
          </Typography>
          {!auth?.user && (
            <Link href={"/SignIn"}>
              {" "}
              <Button
                variant="soft"
                color="neutral"
                endDecorator={<KeyboardArrowRight />}
              >
                Log in
              </Button>
            </Link>
          )}
        </CardActions>
      </Card>
    </Box>
  );
}
