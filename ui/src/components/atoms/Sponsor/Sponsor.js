import React from "react";
import "lazysizes";

import s from "./Sponsor.module.scss";

function Sponsor() {
  const names = [
    {
      url:
        "https://res.cloudinary.com/patal/image/upload/v1598716749/patal/sponsors/sriwijaya_host.png",
      link: "https://sriwijayahost.id",
    },
    {
      url:
        "https://res.cloudinary.com/patal/image/upload/v1598716749/patal/sponsors/my_office.png",
      link: "https://my-office.co.id",
    },
    {
      url:
        "https://res.cloudinary.com/patal/image/upload/v1598716749/patal/sponsors/andalas_global_teknologi.png",
      link: "https://agt.co.id/",
    },
  ];

  return (
    <div className={s["sponsor-container"]}>
      {names.map((name, i) => (
        <div key={i} className={s["sponsor"]}>
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
