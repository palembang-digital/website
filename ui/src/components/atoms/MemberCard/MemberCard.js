import React from "react";
import PropTypes from "prop-types";
import "lazysizes";

import s from "./MemberCard.module.scss";

const MemberCard = ({ name, job, imageUrl, links, status }) => {
  const renderLinks = () =>
    Object.keys(links).length > 0 ? (
      Object.keys(links).map((key) => (
        <a
          key={key}
          href={links[key]}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img alt={key} src={require(`../../../assets/icons/${key}.svg`)} />
        </a>
      ))
    ) : (
      <div style={{ opacity: 0 }}>-</div>
    );

  return (
    <div
      className={`${s["flex"]} ${s["flex-col"]} ${s["justify-center"]} ${s["items-center"]} ${s["card"]}`}
    >
      {status == "alumni" ? (
        <div
          style={{ backgroundImage: `url(${imageUrl})` }}
          className={`${
            status == "alumni" ? s["alumni-overlay-background"] : ""
          }`}
        >
          <div className={s["alumni-overlay"]}></div>
        </div>
      ) : (
        <img
          alt={name}
          width="216"
          height="216"
          className={`${s["rounded-full"]} lazyload ${
            status == "alumni" ? "" : ""
          }`}
          data-src={imageUrl}
        />
      )}
      <h3 className={`${s["font-bold"]} ${s["my-2"]}`}>{name}</h3>
      <p className={`${s["subtitle"]}`}>{job}</p>
      <div className={`${s["portfolio"]}`}>
        <div className={`${s["divider"]}`}></div>
        <div className={`${s["portfolio-links"]}`}>{renderLinks()}</div>
      </div>
    </div>
  );
};

MemberCard.propTypes = {
  name: PropTypes.string,
  job: PropTypes.string,
  imageUrl: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  links: PropTypes.object,
  status: PropTypes.string,
};

MemberCard.defaultProps = {
  links: {},
};

export default MemberCard;
