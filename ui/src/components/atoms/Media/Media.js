import React from "react";
import MediaStyles from "./Media.module.scss";
import { Row, Col } from "reactstrap";

function MediaList() {
  const names = [
    "https://i.ibb.co/cXt1dXF/IDNTIMES.png",
    "https://i.ibb.co/qs6fGCQ/TRIBUNSUMSEL.png",
    "https://i.ibb.co/JmM6FfL/SUMEKS.png",
    "https://i.ibb.co/7nts4xq/SRIPOKU.png",
    "https://i.ibb.co/hFbTH9z/RMOLSUMSEL.png",
    "https://i.ibb.co/60gR678/PERISTIWABANGSA.png",
    "https://i.ibb.co/jTKZzP4/mutiaraindotv.png",
    "https://i.ibb.co/b17dpQr/MANABERITA.png",
    "https://i.ibb.co/Rb7QG24/KAGANGA.pngswNPj",
    "https://i.ibb.co/jr7KJMj/INFOSEMPURNA.png",
    "https://i.ibb.co/KXk4NsJ/SUARASUMSEL.png",
  ];

  return (
    <div className={`${MediaStyles["containers"]}`}>
      <h1 className={`${MediaStyles["title"]}`}>Liputan Media</h1>
      <div className={`${MediaStyles["container"]} `}>
        <Row
          className={`${MediaStyles["overflow"]} ${MediaStyles["box"]} ${MediaStyles["center-margin"]}`}
        >
          {names.map((name) => (
            <Col className={MediaStyles["img"]}>
              <div>
                <img src={name} width="100px" alt="logo_sponsor" />
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default MediaList;
