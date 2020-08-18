import React from "react";
import Footer from "./components/atoms/Footer/Footer";
import MemberCard from "./components/atoms/MemberCard/MemberCard";
import Navbar from "./components/atoms/Navbar/Navbar";

import s from "./assets/styles/team/index.module.scss";
import TeamData from "./content/team.json";

const Team = () => (
  <div>
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
  </div>
);

export default Team;
