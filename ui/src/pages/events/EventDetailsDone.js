import React from "react";
import { Col, Row } from "antd";

import Register from "./components/Register";
import "./EventDetails.scss";

const EventDetailsDone = ({ event }) => {
  return (
    <div className="DetailEvent">
      <div className="container">
        <div className="title">
          <h1>{event.title}</h1>
        </div>
        <div className="content">
          <Row>
            <Col md={11}>
              <img src={event.image_url} alt={event.title} /> <br />
            </Col>
            <Col md={12}>
              <Register
                fee={event.registration_fee}
                scheduled_end={event.scheduled_end}
              />
            </Col>
          </Row>
          <div className="text" style={{ marginTop: 59 }}>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsDone;
