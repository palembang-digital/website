import React from "react";
import { Row, Col } from "antd";
import "antd/dist/antd.css";
// TODO: Refactor: Rename and move to the same directory.
import "./landing/LandingEvent.scss";
// import "../../../assets/icons/CarouselIcons";
import gambar1 from "../../../assets/icons/CarouselIcons/date_range.png";
import gambar2 from "../../../assets/icons/CarouselIcons/Vector.png";
import gambar3 from "../../../assets/icons/CarouselIcons/payments.png";
import gambar4 from "../../../assets/icons/CarouselIcons/location_on.png";

const EventCarouselContent = ({ event }) => {
  const iconStyle = { display: "inline", marginRight: "10px" };
  const date = new Date(event.scheduled_end).toDateString();
  const hour = new Date(event.scheduled_end).getHours();

  return (
    <div className="carousel-content">
      <Row>
        <Col span={13}>
          <h2>{event.title}</h2>
          <div className="details">
            <Row>
              <Col span={14}>
                <h3>
                  <img src={gambar1} style={iconStyle} />
                  {date}
                </h3>
                <h3>
                  <img src={gambar2} style={iconStyle} />
                  {hour}:00 WIB
                </h3>
                <h3>
                  <img src={gambar3} style={iconStyle} />
                  {event.registration_fee}
                </h3>
                <h3>
                  <img src={gambar4} style={iconStyle} />
                  Live via Zoom Meeting
                </h3>
              </Col>
            </Row>
          </div>
          <button href={event.registration_url}>Daftar Sekarang</button>
        </Col>
        <Col span={11}>
          <img src={event.image_url} />
        </Col>
      </Row>
    </div>
  );
};

export default EventCarouselContent;
