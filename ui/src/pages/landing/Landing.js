import React, { useContext } from "react";
import { useRequest } from "ahooks";
import { Button, Col, Image, Row, Statistic, Typography } from "antd";
import SiteContext from "../../providers/site/SiteContext";

const { Paragraph, Text, Title } = Typography;

const Landing = () => {
  const { isMobile } = useContext(SiteContext);

  const { data: events } = useRequest("/api/v1/events");
  const { data: startups } = useRequest("/api/v1/startups");
  const { data: organizations } = useRequest("/api/v1/organizations");

  const statValueStyle = isMobile
    ? { fontSize: 32, fontWeight: 700 }
    : { fontSize: 36, fontWeight: 700 };

  return (
    <div id="landing">
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

      <Row
        className="container center"
        align="middle"
        justify="space-between"
        style={{
          background: "#FFFFFF",
          borderRadius: 20,
          height: 160,
          position: "relative",
          zIndex: 2,
        }}>
        <Col span={8}>
          <Statistic
            title="Event"
            value={events ? events.length : " "}
            valueStyle={statValueStyle}
          />
        </Col>
        <Col span={8}>
          <Statistic
            title="Startup"
            value={startups ? startups.length : " "}
            valueStyle={statValueStyle}
          />
        </Col>
        <Col span={8}>
          <Statistic
            title="Organisasi"
            value={organizations ? organizations.length : " "}
            valueStyle={statValueStyle}
          />
        </Col>
      </Row>

      <Row
        align="middle"
        style={{
          background: "#F5F5F5",
          height: 400,
          marginTop: -80,
          position: "relative",
          zIndex: 1,
        }}>
        <Col span={24}>
          <Row className="container" align="bottom" justify="space-between">
            <Col>
              <Title level={4} style={{ color: "#BFB5B5", marginBottom: 0 }}>
                Event di waktu dekat
              </Title>
              <Title style={{ marginTop: 0 }}>Kegiatan Patal</Title>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Landing;
