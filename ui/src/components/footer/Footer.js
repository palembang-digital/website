import React from "react";
import { Layout } from "antd";

const { Footer: AntFooter } = Layout;

const Footer = () => {
  return (
    <AntFooter style={{ textAlign: "center" }}>
      Palembang Digital &copy; {new Date().getFullYear()}
    </AntFooter>
  );
};

export default Footer;
