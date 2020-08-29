import React from "react";
import loadable from "@loadable/component";
import PropTypes from "prop-types";

import s from "./Title.module.scss";

const Container = loadable(() => import("reactstrap/es/Container"));

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
