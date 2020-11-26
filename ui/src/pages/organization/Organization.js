import React, { useEffect } from "react";
import { useRequest } from "ahooks";
import { Helmet } from "react-helmet";

import s from "../../assets/styles/team/index.module.scss";
import cardStyle from "../../components/atoms/MemberCard/MemberCard.module.scss";

const OrganizationCard = ({ name, imageUrl }) => {
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

const Organization = () => {
  const { data: organizations } = useRequest("/api/v1/organizations");

  useEffect(() => {
    console.table(organizations);
  }, [organizations]);

  return (
    <>
      <Helmet>
        <title>Organisasi</title>
      </Helmet>

      <div className={`${s["main-bg"]} ${s["p-8"]}`}>
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontWeight: "bold" }}>Organisasi</h1>
          <p>
            Komunitas dan organisasi lokal yang kami dukung dan mendukung kami
            kembali.
          </p>
        </div>

        <div className={`${s["grid"]} ${s["grid-teams"]}`}>
          {organizations &&
            organizations
              .sort((a, b) => (a.name < b.name ? -1 : 1))
              .map((organization, index) => (
                <div key={index} className={`${s["center-margin"]}`}>
                  <OrganizationCard
                    name={organization.name}
                    imageUrl={organization.image_url}
                  />
                </div>
              ))}
        </div>
      </div>
    </>
  );
};

export default Organization;
