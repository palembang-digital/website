import React, { Component } from "react";
import { Container, Row, Col, Img } from "reactstrap";
import s from "./Pataltv.module.scss";
import Title from "../Title/Title";
import ReactPlayer from "react-player";
import PatalPerform from "./Patalperform";
import StudentTalk from "./StudentsTalk";

class Tv extends Component {
  state = {
    url: "https://www.youtube.com/watch?v=MEVic5zRNSk",
    light:
      "https://dynamicbusiness.com.au/wp-content/uploads/2019/12/DB-article-size-copy-4.png",
    cover:
      "https://dynamicbusiness.com.au/wp-content/uploads/2019/12/DB-article-size-copy-4.png",
  };

  preview = (event) => {
    this.setState({
      url: this.state.url,
    });
  };

  render() {
    const { url, light, cover } = this.state;
    return (
      <div>
        <div id="Tv" className={s["pataltv-container"]}>
          <div className={s["acara"]}>
            <Container
              className={`${s["themed-container"]} ${s["title"]}`}
              fluid
            >
              <div>
                <Title subtitle="Berita" title="Liputan Patal"></Title>
              </div>
              <Col className={s["col"]}>
                <Row className={s["player-wrapper"]}>
                  <ReactPlayer
                    light={light}
                    url={url}
                    id="light"
                    className={s["video"]}
                    width="100%"
                    height="500px"
                  />
                </Row>
                <diV className={s["Cont"]}>
                  <Row className={s["row"]}>
                    <img
                      className={s["items"]}
                      src={cover}
                      onClick={() =>
                        this.setState({
                          url: "https://www.youtube.com/watch?v=MEVic5zRNSk",
                          light:
                            "https://www.incimages.com/uploaded_files/image/1920x1080/getty_509107562_2000133320009280346_351827.jpg",
                        })
                      }
                    />
                    <img
                      className={s["items"]}
                      src={cover}
                      onClick={() =>
                        this.setState({
                          url: "https://www.youtube.com/watch?v=zOABu3FcHRY",
                        })
                      }
                    />
                    <img
                      className={s["items"]}
                      src={cover}
                      onClick={() =>
                        this.setState({
                          url: "https://www.youtube.com/watch?v=zOABu3FcHRY",
                        })
                      }
                    />
                  </Row>
                </diV>
              </Col>
            </Container>
          </div>
          <PatalPerform />
          <StudentTalk />
        </div>
      </div>
    );
  }
}

export default Tv;
