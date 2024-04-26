import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import Image from "next/image";

export default function FAQCard() {
  return (
    <Card
      size="lg"
      variant="plain"
      orientation="horizontal"
      sx={{
        textAlign: "center",
        maxWidth: "100%",
        my:2,
        mx:"auto"
      }}
    >
      <CardOverflow
        variant="solid"
        color="primary"
        sx={{
          flex: "0 0 100px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          px: "var(--Card-padding)",
        }}
      >
        <Typography fontSize="xl4" fontWeight="xl" textColor="#fff">
          89
        </Typography>
        <Typography textColor="primary.200">
          FAQs answered, see if yours is one of them.
        </Typography>
      </CardOverflow>
      <CardContent sx={{ gap: 1.5, minWidth: 130 }}>
        <AspectRatio ratio="19/8" objectFit="contain" variant="plain">
          <Image
            width={300}
            height={200}
            alt=""
            src="https://static.vecteezy.com/system/resources/previews/006/409/485/original/people-thinking-to-make-decision-problem-solving-and-find-creative-ideas-with-question-mark-in-flat-cartoon-background-for-poster-illustration-vector.jpg"
          />
        </AspectRatio>
        <CardContent>
          <Typography level="title-lg">Need Some Help?</Typography>
          <Typography fontSize="sm" sx={{ mt: 0.5 }}>
          Ask us anytime
          </Typography>
        </CardContent>
        <Button
          variant="outlined"
          color="primary"
          sx={{
            "--variant-borderWidth": "2px",
            borderRadius: 40,
            borderColor: "primary.500",
            mx: "auto",
          }}
        >
          See FAQ
        </Button>
      </CardContent>
    </Card>
  );
}
