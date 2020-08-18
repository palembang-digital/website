import React from "react";
import PropTypes from "prop-types";
import "lazysizes";

import s from "~/src/components/atoms/MemberCard/MemberCard.module.scss";

const MemberCard = ({ name, job, imageUrl, links }) => {
  const renderLinks = () =>
    Object.keys(links).length > 0 ? (
      Object.keys(links).map((key) => (
        <a href={links[key]} target="_blank" rel="noopener noreferrer">
          <img alt={key} src={require(`~/static/icons/${key}.svg`)} />
        </a>
      ))
    ) : (
      <div style={{ opacity: 0 }}>-</div>
    );

  return (
    <div
      className={`${s["flex"]} ${s["flexCol"]} ${s["justifyCenter"]} ${s["itemsCenter"]} ${s["card"]}`}
    >
      <img
        alt={name}
        width="216"
        height="216"
        className={`${s["roundedFull"]} lazyload`}
        data-src={imageUrl}
      />
      <h3 className={`${s["fontBold"]} ${s["my2"]}`}>{name}</h3>
      <p className={`${s["subtitle"]}`}>{job}</p>
      <div className={`${s["portfolio"]}`}>
        <div className={`${s["divider"]}`}></div>
        <div className={`${s["portfolioLinks"]}`}>{renderLinks()}</div>
      </div>
    </div>
  );
};

MemberCard.propTypes = {
  name: PropTypes.string,
  job: PropTypes.string,
  imageUrl: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  links: PropTypes.object,
};

MemberCard.defaultProps = {
  links: {},
};

export default MemberCard;
