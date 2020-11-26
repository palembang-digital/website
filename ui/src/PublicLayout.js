import React from "react";
import loadable from "@loadable/component";

const Navbar = loadable(() => import("./components/atoms/Navbar/Navbar"));
const Footer = loadable(() => import("./components/atoms/Footer/Footer"));

export const PublicLayout = (Component) => {
  return (props) => (
    <>
      <Navbar />
      <Component {...props} />
      <Footer />
    </>
  );
};
