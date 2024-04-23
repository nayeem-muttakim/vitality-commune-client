import { useRouter } from "next/navigation";
import useAuth from "./shared/Hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (user) return children;
  return router.push("/SignIn");
};

export default PrivateRoute;
