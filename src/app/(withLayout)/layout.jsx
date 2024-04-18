'use client'
import Navbar from "@/components/shared/Navbar/Navbar"
import Footer from "@/components/shared/Footer/Footer"
import { HelmetProvider } from "react-helmet-async";

const Layout = ({ children }) => {
  return (
    <HelmetProvider>
      <Navbar />
      {children}
      <Footer/>
    </HelmetProvider>
  );
};

export default Layout;
