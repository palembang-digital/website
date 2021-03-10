import React from "react";
import loadable from "@loadable/component";
import { Helmet } from "react-helmet";

import TeamData from "./content/team.json";
import s from "./assets/styles/team/index.module.scss";

const Footer = loadable(() => import("./components/atoms/Footer/Footer"));
const MemberCard = loadable(() =>
  import("./components/atoms/MemberCard/MemberCard")
);
const Navbar = loadable(() => import("./components/atoms/Navbar/Navbar"));

const Team = () => (
  <>
    <Helmet>
      <title>Team</title>
    </Helmet>

    <Navbar />

    <div className={`${s["main-bg"]} ${s["p-8"]}`}>
      <div className={`${s["grid"]} ${s["grid-teams"]}`}>
        {TeamData.map((team, i) =>
          team.status == "active" ? (
            <div key={i} className={`${s["center-margin"]}`}>
              <MemberCard
                name={team.name}
                job={team.job}
                imageUrl={team.imageUrl}
                status={team.status}
                links={team.links || {}}
              />
            </div>
          ) : null
        )}
      </div>
      <div className={`${s["grid"]} ${s["grid-teams"]}`}>
        {TeamData.map((team, i) =>
          team.status == "alumni" ? (
            <div key={i} className={`${s["center-margin"]}`}>
              <MemberCard
                name={`${team.name} (Alumni)`}
                job={team.job}
                imageUrl={team.imageUrl}
                status={team.status}
                links={team.links || {}}
              />
            </div>
          ) : null
        )}
      </div>
    </div>

    <Footer />
  </>
);

export default Team;
