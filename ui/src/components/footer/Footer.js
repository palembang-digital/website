import React, { useContext } from "react";
import { Col, Divider, Row } from "antd";
import {
  InstagramOutlined,
  MailOutlined,
  WhatsAppOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";

import SiteContext from "../../providers/site/SiteContext";

const Footer = () => {
  const { isMobile } = useContext(SiteContext);

  return (
    <footer
      className="container"
      style={{ color: "#BFB5B5", paddingBottom: 48, paddingTop: 48 }}>
      <Row align="top" justify={isMobile ? "" : "center"} gutter={[48, 8]}>
        <Col>
          <WhatsAppOutlined />{" "}
          <a
            href="https://api.whatsapp.com/send?phone=+6282282512539"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#BFB5B5" }}>
            0822-8251-2539
          </a>
        </Col>
        <Col>
          <MailOutlined />{" "}
          <a
            href="mailto:palembangdigital01@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#BFB5B5" }}>
            palembangdigital01@gmail.com
          </a>
        </Col>
        <Col>
          <InstagramOutlined />{" "}
          <a
            href="https://instagram.com/palembang_digital"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#BFB5B5" }}>
            palembang_digital
          </a>
        </Col>
        <Col>
          <YoutubeOutlined />{" "}
          <a
            href="https://www.youtube.com/channel/UCc2Wluk3SISRSNzNlxaQ1Fw"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#BFB5B5" }}>
            Palembang Digital
          </a>
        </Col>
      </Row>
      <Divider />
      <Row align="top" justify="space-between">
        <Col>
          <p>
            Graha Edukasi, Jl. MP. Mangkunegara No.5, Bukit Sangkal,
            <br />
            Kec. Kalidoni, Kota Palembang, Sumatera Selatan, 30114
          </p>
        </Col>
        <Col>
          <p>Palembang Digital &copy; Hak Cipta {new Date().getFullYear()}</p>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
