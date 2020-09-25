import React from "react";

import Article from "./Article";

export default {
  title: "Atoms/Article",
  component: Article,
};

const Template = (args) => (
  <Article
    title="Sharing Session: Path-finding Journey on UX Field"
    url="https://docs.google.com/forms/d/e/1FAIpQLSdBMQ_oWHB7LKNE0XN_5Z3eGLGIzpxk18SEee4UqkW5PQ7rOQ/viewform"
    img="https://res.cloudinary.com/patal/image/upload/v1600784780/patal/events/4-15_llekiv.jpg"
    {...args}
  />
);

export const Default = Template.bind({});
