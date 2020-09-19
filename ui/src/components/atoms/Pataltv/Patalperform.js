import React, { Component } from "react";
import { Container, Row, Col, Img } from "reactstrap";
import Title from "../Title/Title";
import s from "./Pataltv.module.scss";
import Pagination from "react-bootstrap/Pagination";

let active = 2;
let items = [];
for (let number = 1; number <= 5; number++) {
  items.push(
    <Pagination.Item key={number} active={number === active}>
      {number}
    </Pagination.Item>
  );
}

const PaginationBasic = () => (
  <div>
    <Pagination>
      <Pagination.Prev />
      {items}
      <Pagination.Next />
    </Pagination>
  </div>
);

class PatalPerform extends Component {
  render() {
    return (
      <div>
        <div id="Tv" className={s["pataltv-container"]}>
          <div className={s["acara"]}>
            <Container
              className={`${s["themed-container"]} ${s["title"]}`}
              fluid
            >
              <div>
                <Title title="Patal Perform"></Title>
              </div>
            </Container>
            <Container className={s["PerformContainer"]}>
              <div>
                <Row className={s["BoxPerform"]}>
                  <Col className={s["colperform"]}>
                    <div class={s["performImg"]}>
                      <img
                        src="https://www.javelin-tech.com/3d/wp-content/uploads/high-tech-company.jpg"
                        className={s["imgperform"]}
                      />
                    </div>
                  </Col>
                  <Col>
                    <div class={s["performImg"]}>
                      <h1 className={s["h1"]}>Aplikasi ABC</h1>
                      <p>
                        Patal perform kali ini presentasi oleh team ABC dalam
                        membuat aplikasi ABC yang berguna untuk masyarakat
                      </p>
                    </div>
                  </Col>
                </Row>
                <Row className={s["BoxPerform"]}>
                  <Col className={s["colperform"]}>
                    <div class={s["performImg"]}>
                      <img
                        src="https://www.javelin-tech.com/3d/wp-content/uploads/high-tech-company.jpg"
                        className={s["imgperform"]}
                      />
                    </div>
                  </Col>
                  <Col>
                    <div class={s["performImg"]}>
                      <h1 className={s["h1"]}>Aplikasi ABC</h1>
                      <p>
                        Patal perform kali ini presentasi oleh team ABC dalam
                        membuat aplikasi ABC yang berguna untuk masyarakat
                      </p>
                    </div>
                  </Col>
                </Row>
                <Row className={s["BoxPerform"]}>
                  <Col className={s["colperform"]}>
                    <div class={s["performImg"]}>
                      <img
                        src="https://www.javelin-tech.com/3d/wp-content/uploads/high-tech-company.jpg"
                        className={s["imgperform"]}
                      />
                    </div>
                  </Col>
                  <Col>
                    <div class={s["performImg"]}>
                      <h1 className={s["h1"]}>Aplikasi ABC</h1>
                      <p>
                        Patal perform kali ini presentasi oleh team ABC dalam
                        membuat aplikasi ABC yang berguna untuk masyarakat
                      </p>
                    </div>
                  </Col>
                </Row>
                <Row className={s["Pagination"]}>
                  <PaginationBasic />
                </Row>
              </div>
            </Container>
          </div>
        </div>
      </div>
    );
  }
}

export default PatalPerform;
