import React, { useContext } from "react";
import { navigate } from "@reach/router";
import { useRequest } from "ahooks";
import { Button, Card, Col, Row, Skeleton, Statistic, Typography } from "antd";

import AboutPatal from "../about/AboutPatal";
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

  const medias = [
    "https://res.cloudinary.com/patal/image/upload/v1598717749/patal/media_coverages/IDNTIMES_imlsht.png",
    "https://res.cloudinary.com/patal/image/upload/v1598717750/patal/media_coverages/TRIBUNSUMSEL_fhrlcu.png",
    "https://res.cloudinary.com/patal/image/upload/v1598717749/patal/media_coverages/SUMEKS_rtzfjk.png",
    "https://res.cloudinary.com/patal/image/upload/v1598717749/patal/media_coverages/SRIPOKU_rs7m1z.png",
    "https://res.cloudinary.com/patal/image/upload/v1598717749/patal/media_coverages/RMOLSUMSEL_y8wdgi.png",
    "https://res.cloudinary.com/patal/image/upload/v1598717749/patal/media_coverages/PERISTIWABANGSA_dyhtbp.png",
    "https://res.cloudinary.com/patal/image/upload/v1598717749/patal/media_coverages/mutiaraindotv_pzyoka.png",
    "https://res.cloudinary.com/patal/image/upload/v1598717748/patal/media_coverages/MANABERITA_g3qwfu.png",
    "https://res.cloudinary.com/patal/image/upload/v1598717749/patal/media_coverages/KAGANGA_fyadzh.png",
    "https://res.cloudinary.com/patal/image/upload/v1598717549/patal/media_coverages/INFOSEMPURNA_qkys8c.png",
    "https://res.cloudinary.com/patal/image/upload/v1598717750/patal/media_coverages/SUARASUMSEL_yahi5i.png",
    "https://res.cloudinary.com/patal/image/upload/c_scale,h_87/v1598717750/patal/media_coverages/Sonora-2017_asjlef.png",
  ];

  const sponsors = [
    "https://res.cloudinary.com/patal/image/upload/v1598716749/patal/sponsors/andalas_global_teknologi.png",
    "https://res.cloudinary.com/patal/image/upload/v1598716749/patal/sponsors/my_office.png",
    "https://res.cloudinary.com/patal/image/upload/v1598716749/patal/sponsors/sriwijaya_host.png",
  ];

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
          <img
            alt="Palembang Digital"
            src="https://res.cloudinary.com/patal/image/upload/v1622083241/patal/events/Artboard_1_300x_1_gz2rjw.png"
            style={{ maxWidth: 300 }}
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
          {events ? (
            <Statistic
              title="Event"
              value={events.length}
              valueStyle={statValueStyle}
            />
          ) : (
            <Skeleton.Button active />
          )}
        </Col>
        <Col span={8}>
          {startups ? (
            <Statistic
              title="Startup"
              value={startups.length}
              valueStyle={statValueStyle}
            />
          ) : (
            <Skeleton.Button active />
          )}
        </Col>
        <Col span={8}>
          {organizations ? (
            <Statistic
              title="Organisasi"
              value={organizations.length}
              valueStyle={statValueStyle}
            />
          ) : (
            <Skeleton.Button active />
          )}
        </Col>
      </Row>

      <Row
        align="middle"
        style={{
          background: "#F5F5F5",
          marginTop: -80,
          paddingBottom: 80,
          paddingTop: 120,
          zIndex: 1,
        }}>
        <Col className="container">
          <Row align="bottom" justify="space-between">
            <Col>
              <Title level={4} style={{ color: "#BFB5B5", marginBottom: 0 }}>
                Event di waktu dekat
              </Title>
              <Title style={{ marginTop: 0 }}>Kegiatan Patal</Title>
            </Col>
          </Row>

          {events && events.length > 0 ? (
            <Row align="top" justify="space-between" gutter={[48, 48]}>
              {events
                .sort(
                  (a, b) =>
                    Date.now() -
                    new Date(a.scheduled_start) -
                    (Date.now() - new Date(b.scheduled_start))
                )
                .slice(0, 3)
                .map((event, idx) => (
                  <Col key={idx} span={isMobile ? 24 : 8}>
                    <Card
                      hoverable
                      cover={<img alt={event.title} src={event.image_url} />}
                      onClick={() => navigate(event.registration_url)}>
                      <Text strong>{event.title}</Text>
                    </Card>
                  </Col>
                ))}
            </Row>
          ) : (
            <Skeleton active />
          )}
        </Col>
      </Row>

      <Row
        className="container"
        align="middle"
        justify="center"
        style={{ marginBottom: 70, marginTop: 80 }}>
        <Col span={isMobile ? 24 : 12}>
          <AboutPatal />
        </Col>
      </Row>

      <div
        style={{ backgroundColor: "white", paddingBottom: 80, paddingTop: 80 }}>
        <div className="container center">
          <Title level={3} style={{ marginBottom: 40 }}>
            Liputan Media
          </Title>
          <Row align="middle" justify="center" gutter={[48, 48]}>
            {medias.map((media, idx) => (
              <Col key={idx} span={isMobile ? 12 : 4}>
                <img alt={media} src={media} style={{ maxWidth: 100 }} />
              </Col>
            ))}
          </Row>
        </div>
      </div>

      <div style={{ paddingBottom: 80, paddingTop: 80 }}>
        <div className="container center">
          <Title level={3} style={{ marginBottom: 40 }}>
            Sponsor
          </Title>
          <Row align="middle" justify="center" gutter={[48, 48]}>
            {sponsors.map((sponsor, idx) => (
              <Col key={idx} span={isMobile ? 12 : 4}>
                <img alt={sponsor} src={sponsor} style={{ maxWidth: 100 }} />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Landing;
