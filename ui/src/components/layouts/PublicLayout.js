import React, { useMemo } from "react";
import { useSize } from "ahooks";

import Header from "../header/Header";
import Footer from "../footer/Footer";
import SiteContext from "../../providers/site/SiteContext";

const RESPONSIVE_MOBILE_WIDTH = 768;

const PublicLayout = (Component) => {
  const dom = document.querySelector("body");
  const size = useSize(dom);

  const isMobile = useMemo(
    () => size.width < RESPONSIVE_MOBILE_WIDTH,
    [size.width]
  );

  return (props) => (
    <SiteContext.Provider value={{ isMobile }}>
      <Header />
      <Component {...props} />
      <Footer />
    </SiteContext.Provider>
  );
};

export default PublicLayout;
