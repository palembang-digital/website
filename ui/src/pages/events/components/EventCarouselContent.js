import React from "react";
import { Row, Col } from "antd";
import "antd/dist/antd.css";
// TODO: Refactor: Rename and move to the same directory.
import "./landing/LandingEvent.scss";

const EventCarouselContent = ({ event }) => {
  return (
    <div className="carousel-content">
      <Row>
        <Col span={13}>
          {/* <h1>Sharing Session</h1> */}
          <h2>{event.title}</h2>
          {/* TODO: Use event data
          For schedule, use Indonesian
          */}
          <h3>Jum'at, 24 September 2021</h3>
          <h3>19.00 WIB</h3>
          <h3>Free</h3>
          <h3>Live via Zoom Meeting</h3>
          <button>Daftar Sekarang</button>
        </Col>
        <Col span={11}>
          <img src={event.image_url} />
        </Col>
      </Row>
    </div>
  );
};

export default EventCarouselContent;
