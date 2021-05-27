import React from "react";
import { Typography } from "antd";

const { Title: AntTitle } = Typography;

const Title = ({ title, titleLevel = 1, subtitle, subtitleLevel = 3 }) => {
  return (
    <>
      {subtitle !== "" && (
        <AntTitle
          level={subtitleLevel}
          style={{ color: "#BFB5B5", marginBottom: 0 }}>
          {subtitle}
        </AntTitle>
      )}
      <AntTitle level={titleLevel} style={{ marginTop: 0 }}>
        {title}
      </AntTitle>
    </>
  );
};

export default Title;
