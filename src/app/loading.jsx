'use client'
import loading from "@/assets/loading.json";
import Lottie from "lottie-react";
const LoadingPage = () => {
  return (
    <div>
      <Lottie style={{ height: 600 }} animationData={loading} />
    </div>
  );
};

export default LoadingPage;
