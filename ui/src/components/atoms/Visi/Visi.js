import React from "react";
import PropTypes from "prop-types";

import s from "./Visi.module.scss";

const Visi = ({ judul, konten1 }) => {
  return (
    <div id={s["visi"]} className={`${s["visimisi"]} ${s["center"]}`}>
      <h1>{judul}</h1>
      <div
        style={{
          textAlign: "left",
          paddingLeft: 15,
          paddingRight: 15,
        }}
      >
        {konten1}
      </div>
    </div>
  );
};

Visi.propTypes = {
  judul: PropTypes.string,
  konten1: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.element,
  ]),
};

export default Visi;
