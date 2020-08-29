import React from "react";

import About from "./components/atoms/About/About";
import Banner from "./components/atoms/Banner/Banner";
import Events from "./components/atoms/Events/Events";
import Footer from "./components/atoms/Footer/Footer";
import Join from "./components/atoms/Join/Join";
import Media from "./components/atoms/Media/Media";
import Misi from "./components/atoms/Visi/Misi";
import Navbar from "./components/atoms/Navbar/Navbar";
import Sponsor from "./components/atoms/Sponsor/Sponsor";
import Visi from "./components/atoms/Visi/Visi";

const Landing = () => (
  <>
    <main style={{ backgroundColor: "#fafafa" }}>
      <Navbar />
      <Banner />
      <Join />
      <Events />
      <About />
      <Visi
        judul="Visi"
        konten1="Menciptakan SDM khususnya masyarakat Sumatera Selatan untuk memiliki kemampuan daya saing yang unggul di bidang digital"
      />
      <Visi judul="Misi" konten1={<Misi />} />
      <Media />
      <Sponsor />
      <Footer />
    </main>
  </>
);

export default Landing;
