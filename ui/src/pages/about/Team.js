import React, { useContext, useState } from "react";
import { Button, Card, Col, Row, Typography } from "antd";

import Title from "../../components/title/Title";
import SiteContext from "../../providers/site/SiteContext";

import team from "../../assets/team.json";

const { Paragraph, Text } = Typography;

const Team = () => {
  const { isMobile } = useContext(SiteContext);

  const [teamDisplayed, setTeamDisplayed] = useState(false);
  const toggleTeam = () => setTeamDisplayed(!teamDisplayed);

  return (
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

        {teamDisplayed && (
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
                        <Text style={{ color: "#A39F9F" }}>{member.job}</Text>
                      </Col>
                      {member.links && Object.keys(member.links).length > 0 && (
                        <Col span={24} style={{ marginTop: 12 }}>
                          <Row align="middle" gutter={[16, 8]}>
                            {Object.keys(member.links).map((key) => (
                              <Col key={key}>
                                <a
                                  href={member.links[key]}
                                  target="_blank"
                                  rel="noopener noreferrer">
                                  <img
                                    alt={key}
                                    src={require(`../../assets/icons/${key}.svg`).default}
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
                </Col>
              ))}
          </Row>
        )}
      </Col>
    </Row>
  );
};

export default Team;
