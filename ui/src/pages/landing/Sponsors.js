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
    "https://res.cloudinary.com/patal/image/upload/v1645847080/patal/sponsors/logo1_ojw3qb.svg",
    "https://res.cloudinary.com/patal/image/upload/v1645847219/patal/sponsors/PB_AWS_logo_RGB_stacked_REV_SQ.91cd4af40773cbfbd15577a3c2b8a346fe3e8fa2_mfcojl.png"
  ];

  return (
    <div style={{ paddingBottom: 80, paddingTop: 80 }}>
      <div className="container center">
        <Title level={3} style={{ marginBottom: 40 }}>
          Supported by:
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
