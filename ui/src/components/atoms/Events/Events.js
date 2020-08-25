import React from "react";
import { useRequest } from "ahooks";
import { Container, Row, Col } from "reactstrap";
import Article from "../Article/Article";
import Title from "../Title/Title";
import s from "./Events.module.scss";

const Events = () => {
  const { data: events } = useRequest("/api/v1/events");

  return (
    <div id="events" className={s["events-container"]}>
      <div className={s["acara"]}>
        <Container className={`${s["themed-container"]} ${s["title"]}`} fluid>
          <div>
            <Title
              subtitle="Acara diwaktu dekat"
              title="Kegiatan Patal"
            ></Title>
          </div>
          <Row className={`${s["cp"]} ${s["col"]}`}>
            {events &&
              events
                .sort((a, b) =>
                  new Date(a.created_at) - new Date(b.created_at) ? -1 : 1
                )
                .slice(0, 3)
                .map((event, index) => (
                  <Col key={index}>
                    <Article
                      img={event.image_url}
                      title={event.title}
                      url={event.registration_url}
                    />
                  </Col>
                ))}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Events;
