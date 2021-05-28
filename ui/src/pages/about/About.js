import React from "react";
import { Divider } from "antd";
import { Helmet } from "react-helmet";

import AboutPatal from "./AboutPatal";
import Contact from "./Contact";
import Team from "./Team";
import VisionMission from "./VisionMission";

const About = () => {
  return (
    <>
      <Helmet>
        <title>Tentang</title>
      </Helmet>

      <div className="container">
        <AboutPatal />

        <VisionMission />

        {/* TODO: */}
        {/* <Row>
          <Col>
            <Title title="Platform Palembang Digital" titleLevel={2} />
            <Paragraph>
              Untuk mencapai visi dan misi kami di atas, kami dan anggota Patal menggunakan platform-platform berikut:
            </Paragraph>
          </Col>
        </Row> */}

        <Divider />

        <Team />

        <Contact />
      </div>
    </>
  );
};

export default About;
