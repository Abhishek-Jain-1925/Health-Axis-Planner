import React from "react";
import { Carousel } from "antd";
import wallpaper1 from "../assets/images/wallpaper1.jpg";
import wallpaper2 from "../assets/images/wallpaper4.jpg";
import wallpaper3 from "../assets/images/wallpaper3.jpg";
import AppFooter from "./Footer";
import AboutPage from "./AboutPage";
import Navbar from "./Navbar";
// import video1 from "../assets/videos/video1.mp4";

const Home = () => {
  const contentStyle: React.CSSProperties = {
    height: "560px",
    width: "100%",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };
  return (
    <div className="contents">
      <Navbar />
      <Carousel autoplay>
        {/* <div>
          <video style={contentStyle} autoPlay loop muted>
            <source src={video1} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div> */}
        <div>
          <img style={contentStyle} src={wallpaper1} />
        </div>
        <div>
          <img style={contentStyle} src={wallpaper2} />
        </div>
        <div>
          <img style={contentStyle} src={wallpaper3} />
        </div>
      </Carousel>
      <AboutPage />
      <AppFooter />
    </div>
  );
};

export default Home;
