import React, { useContext } from "react";
import { useRequest } from "ahooks";
import { Card, Col, Image, Row, Skeleton, Typography } from "antd";
import { Helmet } from "react-helmet";

import SiteContext from "../../providers/site/SiteContext";

const { Paragraph, Title } = Typography;

const Organizations = () => {
  const { isMobile } = useContext(SiteContext);

  const { data: organizations } = useRequest("/api/v1/organizations");

  return (
    <>
      <Helmet>
        <title>Organisasi</title>
      </Helmet>

      <div className="container">
        <Title className="center">Organisasi</Title>
        <Paragraph className="center" style={{ marginBottom: "40px" }}>
          Komunitas dan organisasi lokal yang kami dukung dan mendukung kami
          kembali.
        </Paragraph>

        {organizations && organizations.length > 0 ? (
          <Row gutter={[24, 48]} align="middle">
            {organizations
              .sort((a, b) =>
                a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
              )
              .map((organization, index) => (
                <Col
                  key={index}
                  className="gutter-row"
                  span={isMobile ? 24 : 6}>
                  <Card
                    bordered={false}
                    hoverable
                    style={{ background: "transparent" }}
                    cover={
                      <div className="center">
                        <Image
                          alt={organization.name}
                          src={organization.image_url}
                          width={200}
                          preview={false}
                        />
                      </div>
                    }>
                    <Card.Meta
                      title={<div className="center">{organization.name}</div>}
                    />
                  </Card>
                </Col>
              ))}
          </Row>
        ) : (
          <Skeleton />
        )}
      </div>
    </>
  );
};

export default Organizations;
