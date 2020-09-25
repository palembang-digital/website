import React from "react";

import MemberCard from "./MemberCard";

export default {
  title: "Atoms/MemberCard",
  component: MemberCard,
};

const Template = (args) => (
  <MemberCard
    name="Annisa Isma Abella"
    job="Event Management Lead"
    imageUrl="https://res.cloudinary.com/patal/image/upload/v1598704638/patal/teams/Annisa_iz4s8b_thn4vg.jpg"
    links={{
      github: "https://github.com/annisaaismaa",
      linkedin: "https://www.linkedin.com/in/annisaaismaa",
      instagram: "https://www.instagram.com/annisaaismaa/",
    }}
    {...args}
  />
);

export const Default = Template.bind({});
