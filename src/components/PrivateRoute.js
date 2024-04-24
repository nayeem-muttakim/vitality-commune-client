"use client";
import { useRouter } from "next/navigation";
import useAuth from "./shared/Hooks/useAuth/page";
import Lottie from "lottie-react";
import loadingL from "@/assets/loading.json";
const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  console.log(auth.loading);

  const router = useRouter();
  if (auth.loading)
    return <Lottie style={{ height: 600 }} animationData={loadingL} />;
  if (auth.user) return children;
  return router.push("/SignIn");
};

export default PrivateRoute;
