import React, { useContext } from "react";
import { useRequest } from "ahooks";
import { Card, Col, Row, Skeleton, Typography } from "antd";

import SiteContext from "../../providers/site/SiteContext";
import SEO from "../../components/seo/SEO";

const { Paragraph, Title } = Typography;

const Organizations = () => {
  const { isMobile } = useContext(SiteContext);

  const { data: organizations } = useRequest("/api/v1/organizations");

  return (
    <>
      <SEO
        title="Organisasi"
        description="Komunitas dan organisasi lokal yang siap berkolaborasi untuk Palembang."
      />

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
                  span={isMobile ? 24 : 6}
                >
                  <Card
                    bordered={false}
                    hoverable
                    style={{ background: "transparent" }}
                    cover={
                      <div className="center">
                        <img
                          alt={organization.name}
                          src={organization.image_url}
                          width={200}
                        />
                      </div>
                    }
                  >
                    <Card.Meta
                      title={<div className="center">{organization.name}</div>}
                    />
                  </Card>
                </Col>
              ))}
          </Row>
        ) : (
          <Skeleton active />
        )}
      </div>
    </>
  );
};

export default Organizations;
