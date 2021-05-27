import React from "react";
import { Col, Row, Typography } from "antd";

import Title from "../../components/title/Title";

const { Paragraph } = Typography;

const AboutPatal = () => {
  return (
    <Row style={{ marginBottom: 10 }}>
      <Col>
        <Title title="Palembang Digital" subtitle="Tentang kami" />
        <Paragraph>
          Palembang Digital (Patal) adalah platform komunitas digital pertama
          dari dan untuk seluruh masyarakat Sumatera Selatan.
        </Paragraph>
        <Paragraph>
          Terbentuk untuk menjawab pertanyaan "dimana saja pelaku digital di
          Sumatera Selatan?", Palembang Digital berusaha menjadi tempat bagi
          siapapun yang ingin mengenal, belajar, dan berinteraksi dengan
          ekosistem digital Sumatera Selatan.
        </Paragraph>
        <Paragraph>
          Bersama Palembang Digital, kamu bisa belajar dan berbagi ilmu di
          bidang pemrograman, product development, internet marketing, content
          creation, startup, AI dan sebagainya.
        </Paragraph>
        <Paragraph style={{ fontSize: 18 }}>
          <span role="img" aria-label="patal-in-emoji">
            🇮🇩👨‍💻👩‍💻📱🎮🎥🦄🤖
          </span>
        </Paragraph>
      </Col>
    </Row>
  );
};

export default AboutPatal;
