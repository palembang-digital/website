import { useRequest } from "ahooks";
import { Col, Row, Skeleton, Typography } from "antd";
import React, { useContext } from "react";

import SiteContext from "../../providers/site/SiteContext";
import AboutPatal from "../about/AboutPatal";
import UpcomingEvents from "../events/UpcomingEvents";
import Banner from "./Banner";
import Medias from "./Medias";
import Sponsors from "./Sponsors";
import Statistics from "./Statistics";

const { Title } = Typography;

const Landing = () => {
  const { isMobile } = useContext(SiteContext);

  const { data: events } = useRequest("/api/v1/events");
  const { data: startups } = useRequest("/api/v1/startups");
  const { data: organizations } = useRequest("/api/v1/organizations");

  return (
    <>
      <Banner />

      <Statistics
        events={events}
        startups={startups}
        organizations={organizations}
      />

      <Row
        align="middle"
        style={{
          background: "#F5F5F5",
          marginTop: -80,
          paddingBottom: 80,
          paddingTop: 120,
          zIndex: 1,
        }}
      >
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
            <UpcomingEvents events={events} />
          ) : (
            <Skeleton active />
          )}
        </Col>
      </Row>

      <Row
        className="container"
        align="middle"
        justify="center"
        style={{ marginBottom: 70, marginTop: 80 }}
      >
        <Col span={isMobile ? 24 : 12}>
          <AboutPatal />
        </Col>
      </Row>

      <Sponsors />

      <Medias />
    </>
  );
};

export default Landing;
