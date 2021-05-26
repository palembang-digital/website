import React from "react";
import { Col, Divider, Row } from "antd";

const Footer = () => {
  return (
    <footer id="footer" className="container">
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
