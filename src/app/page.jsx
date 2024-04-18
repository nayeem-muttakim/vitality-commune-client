import styles from "./page.module.css";
import Image from "next/image";
import banner from "@/assets/Title Page.jpg";
import Navbar from "@/components/shared/Navbar/Navbar";
import Footer from "@/components/shared/Footer/Footer";
const HomePage = () => {
  
  return (
    <div>
      <Navbar />
      <Image className={styles.image} src={banner} alt="banner" />
      <div title="about us"></div>
      <Footer />
    </div>
  );
};

export default HomePage;
