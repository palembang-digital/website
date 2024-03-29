import React, { useContext } from "react";
import { Link } from "@reach/router";
import { useRequest } from "ahooks";
import { Card, Col, Row, Skeleton, Typography } from "antd";

import SiteContext from "../../providers/site/SiteContext";
import SEO from "../../components/seo/SEO";

const { Paragraph, Title } = Typography;

const Startups = () => {
  const { isMobile } = useContext(SiteContext);

  const { data: startups } = useRequest("/api/v1/startups");

  return (
    <>
      <SEO
        title="Startups"
        description="Perusahaan-perusahaan rintisan lokal yang harus kita dukung"
      />

      <div className="container">
        <Title className="center">Startup</Title>
        <Paragraph className="center" style={{ marginBottom: "40px" }}>
          Perusahaan-perusahaan rintisan lokal yang harus kita ikuti dan dukung
          sepak terjangnya.
        </Paragraph>

        {startups && startups.length > 0 ? (
          <Row gutter={[24, 48]} align="middle">
            {startups
              .sort((a, b) =>
                a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
              )
              .map((startup, index) => (
                <Col
                  key={index}
                  className="gutter-row"
                  span={isMobile ? 24 : 6}
                >
                  <Link to={`/startups/${startup.slug}`}>
                    <Card
                      bordered={false}
                      hoverable
                      style={{ background: "transparent" }}
                      cover={
                        <div className="center">
                          <img
                            alt={startup.name}
                            src={startup.image_url}
                            width={200}
                          />
                        </div>
                      }
                    >
                      <Card.Meta
                        title={<div className="center">{startup.name}</div>}
                      />
                    </Card>
                  </Link>
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

export default Startups;
