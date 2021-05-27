import React, { useContext, useState } from "react";
import { Button, Card, Col, Row, Typography } from "antd";
import { Helmet } from "react-helmet";

import Title from "../../components/title/Title";
import SiteContext from "../../providers/site/SiteContext";

import team from "../../assets/team.json";

const { Paragraph, Text } = Typography;

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
        <Row>
          <Col>
            <Title title="Palembang Digital" subtitle="Tentang kami" />
            <Paragraph>
              Palembang Digital (Patal) adalah platform komunitas digital
              pertama dari dan untuk seluruh masyarakat Sumatera Selatan.
            </Paragraph>
            <Paragraph>
              Terbentuk untuk menjawab pertanyaan, "dimana saja pelaku digital
              di Sumatera Selatan?", Palembang Digital berusaha menjadi tempat
              bagi siapapun yang ingin mengenal, belajar, dan berinteraksi
              dengan ekosistem digital Sumatera Selatan. Bersama Palembang
              Digital, kamu bisa belajar dan berbagi ilmu di bidang pemrograman,
              product development, internet marketing, content creation,
              startup, AI dan sebagainya.
            </Paragraph>
          </Col>
        </Row>

        <Row align="top" justify="space-between" gutter={[48, 8]}>
          <Col span={isMobile ? 24 : 12}>
            <Title title="Visi" titleLevel={3} />
            <Paragraph>
              Menciptakan SDM Sumatera Selatan yang memiliki kemampuan daya
              saing yang unggul di bidang digital.
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

        <Row>
          <Col>
            <Title title="Pengurus Patal" titleLevel={2} />
            <Paragraph>
              Tim relawan Palembang Digital terdiri dari penduduk Indonesia yang
              berbagi mimpi yang sama, yaitu mendemokrasikan ilmu pengetahuan,
              informasi, dan keterampilan di bidang digital kepada seluruh
              lapisan masyarakat di Sumatera Selatan. Sebagian relawan adalah
              mahasiswa/i dari berbagai institusi pendidikan di Sumatera
              Selatan.
            </Paragraph>

            <Button onClick={toggleTeam}>
              {!teamDisplayed ? "Lihat daftar pengurus" : "Sembunyikan"}
            </Button>

            {!teamDisplayed ? (
              <></>
            ) : (
              <Row
                align="top"
                justify="space-between"
                gutter={[24, 24]}
                style={{ marginTop: "1.5em" }}>
                {team
                  .sort((a, b) => (a.status < b.status ? -1 : 1))
                  .map((member, idx) => (
                    <Col key={idx} span={isMobile ? 24 : 6}>
                      <Card
                        bordered={false}
                        hoverable
                        style={{ maxWidth: 240 }}
                        cover={
                          <img
                            alt={member.name}
                            src={member.imageUrl}
                            style={
                              member.status === "alumni"
                                ? { filter: "brightness(50%)" }
                                : {}
                            }
                          />
                        }>
                        <Row>
                          <Col span={24}>
                            <Text strong>{member.name}</Text>
                            {member.status === "alumni" && " (Alumni)"}
                          </Col>
                          <Col span={24}>
                            <Text style={{ color: "#A39F9F" }}>
                              {member.job}
                            </Text>
                          </Col>
                          {member.links &&
                            Object.keys(member.links).length > 0 && (
                              <Col span={24} style={{ marginTop: 12 }}>
                                <Row align="middle" gutter={[16, 8]}>
                                  {Object.keys(member.links).map((key) => (
                                    <Col>
                                      <a
                                        key={key}
                                        href={member.links[key]}
                                        target="_blank"
                                        rel="noopener noreferrer">
                                        <img
                                          alt={key}
                                          src={require(`../../assets/icons/${key}.svg`)}
                                          width={16}
                                        />
                                      </a>
                                    </Col>
                                  ))}
                                </Row>
                              </Col>
                            )}
                        </Row>
                      </Card>
                      ,
                    </Col>
                  ))}
              </Row>
            )}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default About;
