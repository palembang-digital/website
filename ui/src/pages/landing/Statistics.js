import React, { useContext } from "react";
import { Col, Row, Skeleton, Statistic } from "antd";

import SiteContext from "../../providers/site/SiteContext";

const Statistics = ({ events, startups, organizations}) => {
  const { isMobile } = useContext(SiteContext);

  const statValueStyle = isMobile
    ? { fontSize: 32, fontWeight: 700 }
    : { fontSize: 36, fontWeight: 700 };

  return (
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
  );
};

export default Statistics;
