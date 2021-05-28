import React, { useMemo } from "react";
import loadable from "@loadable/component";
import { useSize } from "ahooks";
import { BackTop } from "antd";

import SiteContext from "../../providers/site/SiteContext";

const Header = loadable(() => import("../header/Header"));
const Footer = loadable(() => import("../footer/Footer"));

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
      <BackTop />
      <Header />
      <Component {...props} />
      <Footer />
    </SiteContext.Provider>
  );
};

export default PublicLayout;
