import React from "react";
import { Card } from "antd";
import { Row, Col } from "antd";
import "./LandingEvent.scss";

import gambar1 from "../../../../assets/icons/UpcomingIcons/Date.png";
import gambar2 from "../../../../assets/icons/UpcomingIcons/Time.png";
import gambar3 from "../../../../assets/icons/UpcomingIcons/payments.png";
import gambar4 from "../../../../assets/icons/UpcomingIcons/Youtube.png";

const EventCards = ({ events }) => {
  return (
    <div className="container">
      <Row gutter={24}>
        {events
          .sort(
            (a, b) =>
              Date.now() -
              new Date(a.scheduled_start) -
              (Date.now() - new Date(b.scheduled_start))
          )
          .map((event, index) => (
            <EventCard event={event} />
          ))}
      </Row>
    </div>
  );
};

const EventCard = ({ event }) => {
  const iconStyle = { display: "inline", marginRight: "10px" };
  const date = new Date(event.scheduled_end);
  const day = new Intl.DateTimeFormat("id", { dateStyle: "full" }).format(date);
  const time = new Intl.DateTimeFormat("id", {
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(date);

  return (
    <Col span={12}>
      <Card
        style={{
          backgroundColor: "#f5f5f5",
          borderRadius: 20,
          marginTop: 40,
          cursor: "pointer",
        }}
      >
        <div className="cardContent">
          <Row>
            <Col span={14}>
              <h1>{event.title}</h1>
              <div className="details">
                <Row>
                  <Col>
                    <h3>
                      <img src={gambar1} style={iconStyle} />
                      {day}
                    </h3>
                    <h3>
                      <img src={gambar2} style={iconStyle} />
                      {time}
                    </h3>
                    <h3>
                      <img src={gambar3} style={iconStyle} />
                      {event.registration_fee
                        ? `Rp ${event.registration_fee},-`
                        : "FREE"}
                    </h3>
                    {event.youtube_id && (
                      <h3>
                        <img src={gambar4} style={iconStyle} />
                        {event.youtube_id}
                      </h3>
                    )}
                  </Col>
                </Row>
              </div>
            </Col>
            <Col span={10}>
              <div className="imgCard">
                <img src={event.image_url} />
              </div>
            </Col>
          </Row>
        </div>
      </Card>
    </Col>
  );
};

export default EventCards;
