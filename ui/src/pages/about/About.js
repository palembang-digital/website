import React, { useContext, useState } from "react";
import { Button, Col, Divider, Row, Typography } from "antd";
import { Helmet } from "react-helmet";

import Title from "../../components/title/Title";
import SiteContext from "../../providers/site/SiteContext";
import Contact from "./Contact";
import Team from "./Team";
import AboutPatal from "./AboutPatal";

const { Paragraph } = Typography;

const About = () => {
  const { isMobile } = useContext(SiteContext);

  const [teamDisplayed, setTeamDisplayed] = useState(false);
  const toggleTeam = () => setTeamDisplayed(!teamDisplayed);

  return (
    <>
      <Helmet>
        <title>Tentang</title>
      </Helmet>

      <div className="container">
        <AboutPatal />

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

        <Row>
          <Col>
            <Title title="Pengurus Patal" titleLevel={2} />
            <Paragraph>
              Tim relawan Palembang Digital terdiri dari putra-putri Indonesia
              yang berbagi mimpi yang sama, yaitu mendemokrasikan ilmu
              pengetahuan, informasi, dan keterampilan di bidang digital kepada
              seluruh lapisan masyarakat di Sumatera Selatan. Sebagian relawan
              adalah mahasiswa/i dari berbagai institusi pendidikan di Sumatera
              Selatan.
            </Paragraph>

            <Button onClick={toggleTeam}>
              {!teamDisplayed ? "Lihat daftar pengurus" : "Sembunyikan"}
            </Button>

            {teamDisplayed && <Team />}
          </Col>
        </Row>

        <Contact />
      </div>
    </>
  );
};

export default About;
