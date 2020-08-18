import React from "react";
import { Container, Row, Col } from "reactstrap";
import Article from "../Article/Article";
import Title from "../Title/Title";
import EventsData from "../../../content/events.json";
import s from "./Events.module.scss";

class Events extends React.Component {
  render() {
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
              {EventsData.content.map((data, index) => {
                return (
                  <Col key={index}>
                    <Article
                      img={data.image_url}
                      title={data.title}
                      url={data.registration_url}
                    />
                  </Col>
                );
              })}
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default Events;
