import React from "react";
import PropTypes from "prop-types";
import { Card, CardImg, CardBody, CardTitle } from "reactstrap";

import s from "./Article.module.scss";

const handleClick = (e, url) => {
  window.open(url, "_blank");
};

const Article = ({ url, img, title }) => {
  return (
    <div id={s["article"]}>
      <Card className={s["teamThumb"]} onClick={(e) => handleClick(e, url)}>
        <CardImg top width="100%" src={img} alt="Card image cap" />
        <CardBody className={s["cardBody"]}>
          <CardTitle>
            <h3>{title}</h3>
          </CardTitle>
        </CardBody>
      </Card>
    </div>
  );
};

Article.propTypes = {
  url: PropTypes.string.isRequired,
  img: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  title: PropTypes.string.isRequired,
};

export default Article;
