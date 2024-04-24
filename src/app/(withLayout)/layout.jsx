'use client'
import Navbar from "@/components/shared/Navbar/Navbar";
import Footer from "@/components/shared/Footer/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

const Layout = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      {children}
      <Footer />
    </QueryClientProvider>
  );
};

export default Layout;
