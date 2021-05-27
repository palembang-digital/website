import React, { useContext } from "react";
import { Card, Col, Row, Typography } from "antd";

import SiteContext from "../../providers/site/SiteContext";

import team from "../../assets/team.json";

const { Text } = Typography;

const Team = () => {
  const { isMobile } = useContext(SiteContext);

  return (
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
  );
};

export default Team;
