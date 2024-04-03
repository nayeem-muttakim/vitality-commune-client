"use client";
import error from "@/assets/error.json";
import { Button } from "@mui/material";
import Lottie from "lottie-react";
import Link from "next/link";

const ErrorPage = () => {
  return (
    <div style={{ paddingInline: 3 }}>
      {" "}
      <Lottie style={{ height: 600 }} animationData={error} />
      <Link href={"/"}>
        <Button
          sx={{ marginBlock: 2 }}
          size="large"
          variant="contained"
          fullWidth
        >
          Home
        </Button>
      </Link>
    </div>
  );
};

export default ErrorPage;
