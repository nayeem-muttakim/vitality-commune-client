import toast from "react-hot-toast";
import useAxiosPublic from "./Hooks/useAxios/page";
import useAuth from "./Hooks/useAuth/page";
import { Box, Button } from "@mui/material";
import Image from "next/image";
import ggLogo from "@/assets/google.png";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Social = () => {
  const { googleSignIn } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const axiosPublic = useAxiosPublic();

  const handleGoogle = async () => {
    if (isSubmitting) return; // Prevent double submission
    setIsSubmitting(true);
    googleSignIn()
      .then((res) => {
        const userInfo = {
          email: res?.user?.email,
          name: res?.user?.displayName,
          role: "user",
          points: 0,
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          setIsSubmitting(false);
          toast.success("Signed In");
          router.push("/");
        });
      })
      .catch((err) => {
        setIsSubmitting(false);
        toast.error("Invalid User");
      });
  };

  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
      }}
      sx={{ px: 5, mt: 2 }}
    >
      {/* google register */}
      <Button
        variant="outlined"
        sx={{ width: "100%", py: 1.5 }}
        onClick={handleGoogle}
      >
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <Image width={27} src={ggLogo} alt="gg" />
          Continue With Google
        </Box>
      </Button>
    </Box>
  );
};

export default Social;
