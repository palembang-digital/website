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
          {/* <h3>Melihat Peluang Karir Talenta Digital di Era Sekarang</h3> */}
        </div>
        <div className="content">
          <Row>
            <Col md={11}>
              <img src={event.image_url} alt={event.title} /> <br />
            </Col>
            <Col md={12}>
              <div className="content-desc">
                {/* <div className="text">
                                    <p>Buat kalian yang saat ini ingin cari tau bagaimana sih sebenarny peluang karir dibidang digital seperti programming, digital marketing dan lain sebagainya dan juga kalian ingin tau bagaimana sih budaya kerja di perusahaan teknologi / digital..
                                        <br /> <br />

                                        Ikuti webinar Palembang digital sharing session dengan tema " Melihat peluang karir talenta digital diera sekarang"<br /> <br />

                                        Dengan Narasumber Riski Jaka Lalana, beliau merupakan GM human Capital di 3(Tri) Indonesia dan juga beliau meruapakan co. founder dari Komunitas dimeja kantor.</p>
                                </div> */}
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
