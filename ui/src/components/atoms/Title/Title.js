import React from "react";
import PropTypes from "prop-types";
import s from "./Title.module.scss";
import { Container } from "reactstrap";

const Title = ({ title, subtitle }) => {
  return (
    <div id={s["title"]}>
      <Container className="themed-container title" fluid>
        <div>
          <h2>{subtitle}</h2>
          <h1>{title}</h1>
        </div>
      </Container>
    </div>
  );
};

Title.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

export default Title;
