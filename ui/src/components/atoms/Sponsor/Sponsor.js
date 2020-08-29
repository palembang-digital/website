import React from "react";
import "lazysizes";

// import agt from "../../../assets/images/sponsors/AGT.png";
// import myo from "../../../assets/images/sponsors/myo.png";
// import sh from "../../../assets/images/sponsors/sh.png";
import s from "./Sponsor.module.scss";

function Sponsor() {
  const names = [
    {
      url:
        "https://res.cloudinary.com/dmtvswpik/image/upload/v1598698556/patal-assets/sponsors/sh_pj2oer.png",
      link: "https://sriwijayahost.id",
    },
    {
      url:
        "https://res.cloudinary.com/dmtvswpik/image/upload/v1598698556/patal-assets/sponsors/myo_l00lkn.png",
      link: "https://my-office.co.id",
    },
    {
      url:
        "https://res.cloudinary.com/dmtvswpik/image/upload/v1598698556/patal-assets/sponsors/AGT_icvmoj.png",
      link: "https://agt.co.id/",
    },
  ];
  return (
    <div className={s["sponsor-container"]}>
      {names.map((name, i) => (
        <div key={i} className={`${s["sponsor"]} `}>
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
