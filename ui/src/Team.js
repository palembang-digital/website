import React from "react";
import loadable from "@loadable/component";

import TeamData from "./content/team.json";
import s from "./assets/styles/team/index.module.scss";

const Footer = loadable(() => import("./components/atoms/Footer/Footer"));
const MemberCard = loadable(() =>
  import("./components/atoms/MemberCard/MemberCard")
);
const Navbar = loadable(() => import("./components/atoms/Navbar/Navbar"));

const Team = () => (
  <>
    <Navbar />
    <div className={`${s["main-bg"]} ${s["p-8"]}`}>
      <div className={`${s["grid"]} ${s["grid-teams"]}`}>
        {TeamData.map((team, i) => (
          <div key={i} className={`${s["center-margin"]}`}>
            <MemberCard
              name={team.name}
              job={team.job}
              imageUrl={team.imageUrl}
              links={team.links || {}}
            />
          </div>
        ))}
      </div>
    </div>
    <Footer />
  </>
);

export default Team;
