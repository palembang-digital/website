import React from "react";
import loadable from "@loadable/component";

const About = loadable(() => import("./components/atoms/About/About"));
const Banner = loadable(() => import("./components/atoms/Banner/Banner"));
const Events = loadable(() => import("./components/atoms/Events/Events"));
const Footer = loadable(() => import("./components/atoms/Footer/Footer"));
const Join = loadable(() => import("./components/atoms/Join/Join"));
const Media = loadable(() => import("./components/atoms/Media/Media"));
const Misi = loadable(() => import("./components/atoms/Visi/Misi"));
const Navbar = loadable(() => import("./components/atoms/Navbar/Navbar"));
const Sponsor = loadable(() => import("./components/atoms/Sponsor/Sponsor"));
const Visi = loadable(() => import("./components/atoms/Visi/Visi"));

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
