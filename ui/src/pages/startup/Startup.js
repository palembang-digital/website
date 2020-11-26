import React from "react";
import { useRequest } from "ahooks";
import { Helmet } from "react-helmet";

import s from "../../assets/styles/team/index.module.scss";
import cardStyle from "../../components/atoms/MemberCard/MemberCard.module.scss";

const StartupCard = ({ name, imageUrl }) => {
  return (
    <div
      style={{ minHeight: "360px", justifyContent: "start" }}
      className={`${cardStyle["flex"]} ${cardStyle["flex-col"]} ${cardStyle["justify-center"]} ${cardStyle["items-center"]} ${cardStyle["card"]}`}
    >
      <h3 style={{ margin: "1rem" }}>{name}</h3>
      <img alt={name} width="230" className="lazyload" data-src={imageUrl} />
    </div>
  );
};

const Startup = () => {
  const { data: startups } = useRequest("/api/v1/startups");

  return (
    <>
      <Helmet>
        <title>Organisasi</title>
      </Helmet>

      <div className={`${s["main-bg"]} ${s["p-8"]}`}>
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontWeight: "bold" }}>Startup</h1>
          <p>
            Perusahaan-perusahaan rintisan lokal yang harus kita ikuti sepak
            terjangnya.
          </p>
        </div>

        <div className={`${s["grid"]} ${s["grid-teams"]}`}>
          {startups &&
            startups
              .sort((a, b) => (a.name < b.name ? -1 : 1))
              .map((startup, index) => (
                <div key={index} className={`${s["center-margin"]}`}>
                  <StartupCard
                    name={startup.name}
                    imageUrl={startup.image_url}
                  />
                </div>
              ))}
        </div>
      </div>
    </>
  );
};

export default Startup;
