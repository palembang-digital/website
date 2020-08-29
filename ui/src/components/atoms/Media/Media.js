import React from "react";
import loadable from "@loadable/component";
import "lazysizes";

import MediaStyles from "./Media.module.scss";

const Row = loadable(() => import("reactstrap/es/Row"));
const Col = loadable(() => import("reactstrap/es/Col"));

function MediaList() {
  const names = [
    "https://res.cloudinary.com/patal/image/upload/v1598717749/patal/media_coverages/IDNTIMES_imlsht.png",
    "https://res.cloudinary.com/patal/image/upload/v1598717750/patal/media_coverages/TRIBUNSUMSEL_fhrlcu.png",
    "https://res.cloudinary.com/patal/image/upload/v1598717749/patal/media_coverages/SUMEKS_rtzfjk.png",
    "https://res.cloudinary.com/patal/image/upload/v1598717749/patal/media_coverages/SRIPOKU_rs7m1z.png",
    "https://res.cloudinary.com/patal/image/upload/v1598717749/patal/media_coverages/RMOLSUMSEL_y8wdgi.png",
    "https://res.cloudinary.com/patal/image/upload/v1598717749/patal/media_coverages/PERISTIWABANGSA_dyhtbp.png",
    "https://res.cloudinary.com/patal/image/upload/v1598717749/patal/media_coverages/mutiaraindotv_pzyoka.png",
    "https://res.cloudinary.com/patal/image/upload/v1598717748/patal/media_coverages/MANABERITA_g3qwfu.png",
    "https://res.cloudinary.com/patal/image/upload/v1598717749/patal/media_coverages/KAGANGA_fyadzh.png",
    "https://res.cloudinary.com/patal/image/upload/v1598717549/patal/media_coverages/INFOSEMPURNA_qkys8c.png",
    "https://res.cloudinary.com/patal/image/upload/v1598717750/patal/media_coverages/SUARASUMSEL_yahi5i.png",
    "https://res.cloudinary.com/patal/image/upload/c_scale,h_87/v1598717750/patal/media_coverages/Sonora-2017_asjlef.png",
  ];

  return (
    <div className={`${MediaStyles["containers"]}`}>
      <h1 className={`${MediaStyles["title"]}`}>Liputan Media</h1>
      <div className={`${MediaStyles["container"]} `}>
        <Row
          className={`${MediaStyles["overflow"]} ${MediaStyles["box"]} ${MediaStyles["center-margin"]}`}
        >
          {names.map((name, i) => (
            <Col key={i} className={MediaStyles["img"]}>
              <div>
                <img
                  className="lazyload"
                  data-src={name}
                  width="100px"
                  alt="logo_sponsor"
                />
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default MediaList;
