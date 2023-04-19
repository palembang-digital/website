import { Col, Row, Typography } from "antd";
import React, { useContext } from "react";

import SiteContext from "../../providers/site/SiteContext";

const { Title } = Typography;

const Medias = () => {
  const { isMobile } = useContext(SiteContext);

  const medias = [
    "https://res.cloudinary.com/patal/image/upload/c_scale,w_150/v1598717749/patal/media_coverages/IDNTIMES_imlsht.png",
    "https://res.cloudinary.com/patal/image/upload/c_scale,w_150/v1598717750/patal/media_coverages/TRIBUNSUMSEL_fhrlcu.png",
    "https://res.cloudinary.com/patal/image/upload/c_scale,w_150/v1598717749/patal/media_coverages/SUMEKS_rtzfjk.png",
    "https://res.cloudinary.com/patal/image/upload/c_scale,w_150/v1598717749/patal/media_coverages/SRIPOKU_rs7m1z.png",
    "https://res.cloudinary.com/patal/image/upload/c_scale,w_150/v1598717749/patal/media_coverages/RMOLSUMSEL_y8wdgi.png",
    "https://res.cloudinary.com/patal/image/upload/c_scale,w_150/v1598717749/patal/media_coverages/PERISTIWABANGSA_dyhtbp.png",
    "https://res.cloudinary.com/patal/image/upload/c_scale,w_150/v1598717749/patal/media_coverages/mutiaraindotv_pzyoka.png",
    "https://res.cloudinary.com/patal/image/upload/c_scale,w_150/v1598717748/patal/media_coverages/MANABERITA_g3qwfu.png",
    "https://res.cloudinary.com/patal/image/upload/c_scale,w_150/v1598717749/patal/media_coverages/KAGANGA_fyadzh.png",
    "https://res.cloudinary.com/patal/image/upload/c_scale,w_150/v1598717549/patal/media_coverages/INFOSEMPURNA_qkys8c.png",
    "https://res.cloudinary.com/patal/image/upload/c_scale,w_150/v1598717750/patal/media_coverages/SUARASUMSEL_yahi5i.png",
    "https://res.cloudinary.com/patal/image/upload/c_scale,w_150/v1598717750/patal/media_coverages/Sonora-2017_asjlef.png",
  ];

  return (
    <div style={{ paddingBottom: 80, paddingTop: 80 }}>
      <div className="container center">
        <Title level={3} style={{ marginBottom: 40 }}>
          Liputan Media
        </Title>

        <Row align="middle" justify="center" gutter={[32, 48]}>
          {medias.map((media, idx) => (
            <Col key={idx} span={isMobile ? 12 : 4}>
              <img alt={media} src={media} height={"100%"} width={100} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Medias;
