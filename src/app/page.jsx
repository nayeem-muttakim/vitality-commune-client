import styles from "./page.module.css";
import Image from "next/image";
import banner from "@/assets/Title Page.jpg";
import Navbar from "@/components/shared/Navbar/Navbar";
import Footer from "@/components/shared/Footer/Footer";
import CallToAction from "@/components/CallToAction/CallToAction";
import NewsLetter from "@/components/NewsLetter/NewsLetter";
import AboutUs from "@/components/AboutUs/AboutUs";
const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Image className={styles.image} src={banner} alt="banner" />
      <AboutUs />
      <CallToAction />
      <NewsLetter />
      <Footer />
    </div>
  );
};

export default HomePage;
