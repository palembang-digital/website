import React, { useContext } from "react";
import { Col, Row, Typography } from "antd";

import SiteContext from "../../providers/site/SiteContext";

const { Title } = Typography;

const Landing = () => {
  const { isMobile } = useContext(SiteContext);

  const sponsors = [
    "https://res.cloudinary.com/patal/image/upload/c_scale,w_300/v1598716749/patal/sponsors/andalas_global_teknologi.png",
    "https://res.cloudinary.com/patal/image/upload/c_scale,w_300/v1598716749/patal/sponsors/my_office.png",
    "https://res.cloudinary.com/patal/image/upload/c_scale,w_300/v1598716749/patal/sponsors/sriwijaya_host.png",
  ];

  return (
    <div style={{ paddingBottom: 80, paddingTop: 80 }}>
      <div className="container center">
        <Title level={3} style={{ marginBottom: 40 }}>
          Sponsor
        </Title>

        <Row align="middle" justify="center" gutter={[32, 48]}>
          {sponsors.map((sponsor, idx) => (
            <Col key={idx} span={isMobile ? 12 : 4}>
              <img alt={sponsor} src={sponsor} height={30} width={100} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Landing;
