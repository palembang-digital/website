import React, { Component } from "react";
import { Card } from "antd";
import { Row, Col } from "antd";
import "./LandingEvent.scss";

const data = [
  {
    title: "Spesial Session",
    desc: "Tips & Trik Diterima Magang/Kerja di Sebuah Startup",
    date: "Jum’at, 04 September 2021",
    time: "19.00 WIB",
    fee: "Free",
    platform: "Palembang Digital",
    imgUrl:
      "https://res.cloudinary.com/patal/image/upload/v1634822225/patal/events/tommy_wordpress_hnnumg.jpg",
  },
  {
    title: "Spesial Session",
    desc: "Tips & Trik Diterima Magang/Kerja di Sebuah Startup",
    date: "Jum’at, 04 September 2021",
    time: "19.00 WIB",
    fee: "Free",
    platform: "Palembang Digital",
    imgUrl:
      "https://res.cloudinary.com/patal/image/upload/v1634822225/patal/events/tommy_wordpress_hnnumg.jpg",
  },
  {
    title: "Spesial Session",
    desc: "Tips & Trik Diterima Magang/Kerja di Sebuah Startup",
    date: "Jum’at, 04 September 2021",
    time: "19.00 WIB",
    fee: "Free",
    platform: "Palembang Digital",
    imgUrl:
      "https://res.cloudinary.com/patal/image/upload/v1634822225/patal/events/tommy_wordpress_hnnumg.jpg",
  },
  {
    title: "Spesial Session",
    desc: "Tips & Trik Diterima Magang/Kerja di Sebuah Startup",
    date: "Jum’at, 04 September 2021",
    time: "19.00 WIB",
    fee: "Free",
    platform: "Palembang Digital",
    imgUrl:
      "https://res.cloudinary.com/patal/image/upload/v1634822225/patal/events/tommy_wordpress_hnnumg.jpg",
  },
  {
    title: "Spesial Session",
    desc: "Tips & Trik Diterima Magang/Kerja di Sebuah Startup",
    date: "Jum’at, 04 September 2021",
    time: "19.00 WIB",
    fee: "Free",
    platform: "Palembang Digital",
    imgUrl:
      "https://res.cloudinary.com/patal/image/upload/v1634822225/patal/events/tommy_wordpress_hnnumg.jpg",
  },
];

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
              {/* <h2>{event.desc}</h2>
              <p>{event.date}</p>
              <p>{event.time}</p> */}
              <p>{event.registration_fee}</p>
              <p>{event.youtube_id}</p>
            </Col>
            <Col span={10}>
              <img src={event.image_url} />
            </Col>
          </Row>
        </div>
      </Card>
    </Col>
  );
};

export default EventCards;
