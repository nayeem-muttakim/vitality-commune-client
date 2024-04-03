import Footer from "@/components/shared/Footer/page";
import Navbar from "@/components/shared/Navbar/page";
import styles from "./page.module.css";
import Image from "next/image";
import banner from "@/assets/Title Page.jpg";
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
