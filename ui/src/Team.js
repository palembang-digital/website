import React from "react";
import Footer from "./components/atoms/Footer/Footer";
import MemberCard from "./components/atoms/MemberCard/MemberCard";
import Navbar from "./components/atoms/Navbar/Navbar";

import TeamData from "./content/team.json";
import s from "./assets/styles/team/index.module.scss";

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
