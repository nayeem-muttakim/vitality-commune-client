"use client";
import { Button } from "@mui/material";
import Link from "next/link";

import notFound from "@/assets/not-found.json";
import Lottie from "lottie-react";
const NotFound = () => {
  return (
    <div style={{ paddingInline: 3 }}>
      {" "}
      <Lottie style={{ height: 600 }} animationData={notFound} />
      <Link href={"/"}>
        <Button
          size="large"
          variant="outlined"
          sx={{ marginBlock: 2 }}
          fullWidth
        >
          Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
