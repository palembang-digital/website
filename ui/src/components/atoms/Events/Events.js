import React from "react";
import loadable from "@loadable/component";
import { useRequest } from "ahooks";

import s from "./Events.module.scss";

const Container = loadable(() => import("reactstrap/es/Container"));
const Row = loadable(() => import("reactstrap/es/Row"));
const Col = loadable(() => import("reactstrap/es/Col"));
const Article = loadable(() => import("../Article/Article"));
const Title = loadable(() => import("../Title/Title"));

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
          <Row className={`${s["cp"]} ${s["col"]}`} xs="3">
            {events &&
              events
                .filter((event) => Date.now() < new Date(event.scheduled_start))
                .sort(
                  (a, b) =>
                    Date.now() -
                    new Date(b.scheduled_start) -
                    (Date.now() - new Date(a.scheduled_start))
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
