import React from "react";
import { Col, Row, Button } from "antd";
import Register from "./components/Register";
import "./EventDetails.scss";

const EventDetailsUpcoming = ({ event }) => {
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
              <div className="content-desc">
                <Register
                  fee={event.registration_fee}
                  scheduled_end={event.scheduled_end}
                />
              </div>
            </Col>
          </Row>
        </div>
        <div className="button">
          <Button type="primary" shape="round" href={event.registration_url}>
            Daftar Sekarang
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsUpcoming;
