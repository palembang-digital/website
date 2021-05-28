import React, { useContext } from "react";
import { Button, Col, Row, Typography } from "antd";

import SiteContext from "../../providers/site/SiteContext";

const { Paragraph, Text, Title } = Typography;

const Banner = () => {
  const { isMobile } = useContext(SiteContext);

  return (
    <Row
      className="container"
      align="middle"
      justify="space-between"
      style={{ height: 320 }}>
      <Col span={isMobile ? 24 : 12}>
        <Title level={isMobile ? 2 : 1}>
          Dari wong kito,
          <br />
          untuk wong kito!
        </Title>

        <Paragraph style={{ marginBottom: "1.5em" }}>
          <Text strong>Palembang Digital (Patal)</Text> adalah platform
          komunitas digital pertama di Sumatera Selatan untuk berbagi ilmu dan
          pengetahuan di bidang IT.
        </Paragraph>

        <Button
          type="primary"
          size="large"
          href="https://bit.ly/web-join-patal"
          target="_blank"
          rel="noopener noreferrer"
          style={{ paddingLeft: "25px", paddingRight: "25px" }}>
          Bergabung Sekarang
        </Button>
      </Col>

      <Col span={isMobile ? 0 : 12} className="center">
        <img
          alt="Palembang Digital"
          src="https://res.cloudinary.com/patal/image/upload/c_scale,w_600/v1622083241/patal/events/Artboard_1_300x_1_gz2rjw.png"
          style={{ maxWidth: 300 }}
          height={240}
          width={300}
          />
      </Col>
    </Row>
  );
};

export default Banner;
