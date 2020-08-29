import React from "react";
import loadable from "@loadable/component";
// import { Container, Row, Col } from "reactstrap";
import "lazysizes";

import s from "./Banner.module.scss";
import logo from "../../../assets/logo.png";

const Container = loadable(() => import("reactstrap/es/Container"));
const Row = loadable(() => import("reactstrap/es/Row"));
const Col = loadable(() => import("reactstrap/es/Col"));

const Banner = () => {
  return (
    <div id="banner">
      <Container fluid>
        <Row className={s["jumbotron"]} id="inner-banner">
          <Col>
            <h2>Halo,</h2>
            <h1>wong kito!</h1>
            <p>
              Palembang Digital (Patal)
              <span className={s["bold"]}>
                {" "}
                adalah grup berbagi informasi seputar IT Development &amp;
                Digital di daerah Sumatera Selatan.
              </span>
            </p>
          </Col>
          <Col sm="6" className={s["logo"]}>
            <img
              data-src={`https://res.cloudinary.com/dmtvswpik/image/upload/c_scale,h_180/v1598693277/patal-assets/logo_iapkkg.png`}
              className="lazyload"
              width="180px"
              alt="logo"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Banner;
