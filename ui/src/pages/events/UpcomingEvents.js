import React, { useContext } from "react";
import { navigate } from "@reach/router";
import { Card, Col, Row, Typography } from "antd";

import SiteContext from "../../providers/site/SiteContext";

const { Text } = Typography;

const UpcomingEvents = ({ events }) => {
  const { isMobile } = useContext(SiteContext);

  return (
    <Row align="top" justify="space-between" gutter={[32, 48]}>
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
  );
};

export default UpcomingEvents;
