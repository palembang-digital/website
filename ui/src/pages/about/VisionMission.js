import React, { useContext } from "react";
import { Col, Row, Typography } from "antd";

import Title from "../../components/title/Title";
import SiteContext from "../../providers/site/SiteContext";

const { Paragraph } = Typography;

const About = () => {
  const { isMobile } = useContext(SiteContext);

  return (
    <Row align="top" justify="space-between" gutter={[48, 8]}>
      <Col span={isMobile ? 24 : 12}>
        <Title title="Visi" titleLevel={3} />
        <Paragraph>
          Menciptakan sumber daya manusia Sumatera Selatan yang memiliki
          daya saing unggul di bidang digital.
        </Paragraph>
      </Col>

      <Col span={isMobile ? 24 : 12}>
        <Title title="Misi" titleLevel={3} />
        <Paragraph>
          <ol>
            <li>
              Mewujudkan talenta-talenta lokal Sumatera Selatan yang
              memiliki jiwa kolaboratif dan inovatif tinggi.
            </li>
            <li>
              Mewujudkan ekosistem digital yang terus beregenerasi untuk
              keberlangsungan talenta lokal Sumatera Selatan.
            </li>
            <li>
              Meningkatkan hard skills pelaku digital dan masyarakat
              Sumatera Selatan dalam bidang digital.
            </li>
          </ol>
        </Paragraph>
      </Col>
    </Row>
  );
};

export default About;
