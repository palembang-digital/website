import React from "react";
import "lazysizes";

import agt from "../../../assets/images/sponsors/AGT.png";
import myo from "../../../assets/images/sponsors/myo.png";
import sh from "../../../assets/images/sponsors/sh.png";
import s from "./Sponsor.module.scss";

function Sponsor() {
  const names = [
    {
      url: sh,
      link: "https://sriwijayahost.id",
    },
    {
      url: myo,
      link: "https://my-office.co.id",
    },
    {
      url: agt,
      link: "https://agt.co.id/",
    },
  ];
  return (
    <div className={s["sponsor-container"]}>
      {names.map((name) => (
        <div className={`${s["sponsor"]} `}>
          <a href={name.link} target="_blank" rel="noopener noreferrer">
            <img
              data-src={name.url}
              className="lazyload"
              width="100"
              alt="logo_sponsor"
            />
          </a>
        </div>
      ))}
    </div>
  );
}

export default Sponsor;
