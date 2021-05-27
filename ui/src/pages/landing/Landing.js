import React, { useContext } from "react";
import { Button, Col, Image, Row, Typography } from "antd";
import SiteContext from "../../providers/site/SiteContext";

const { Paragraph, Text, Title } = Typography;

const Landing = () => {
  const { isMobile } = useContext(SiteContext);

  return (
    <div>
      <Row
        className="container"
        align="middle"
        justify="space-between"
        style={{ height: 320 }}>
        <Col span={isMobile ? 24 : 12}>
          <Title>
            Dari wong kito,
            <br />
            untuk wong kito!
          </Title>
          <Paragraph style={{ marginBottom: "1.5em" }}>
            <Text strong>Palembang Digital</Text> adalah platform komunitas
            digital pertama di Sumatera Selatan untuk berbagi ilmu dan
            pengetahuan di bidang IT.
          </Paragraph>
          <Button
            type="primary"
            size="large"
            href="https://bit.ly/web-join-patal"
            target="_blank"
            style={{ paddingLeft: "25px", paddingRight: "25px" }}>
            Bergabung Sekarang
          </Button>
        </Col>
        <Col span={isMobile ? 0 : 12} className="center">
          <Image
            width={300}
            preview={false}
            alt="Palembang Digital"
            src="https://res.cloudinary.com/patal/image/upload/v1622083241/patal/events/Artboard_1_300x_1_gz2rjw.png"
          />
        </Col>
      </Row>
    </div>
  );
};

export default Landing;
