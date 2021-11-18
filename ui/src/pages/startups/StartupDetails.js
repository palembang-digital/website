import React from "react";
import { useRequest } from "ahooks";
import { Image, Typography } from "antd";

import SEO from "../../components/seo/SEO";

const { Title } = Typography;

const StartupDetails = ({ startupSlug }) => {
  const { data: startup } = useRequest(`/api/v1/startups/${startupSlug}`);

  return (
    <>
      {startup && <SEO title={startup.name} description={startup.one_liner} />}

      <div className="container">
        {startup ? (
          <>
            <center>
              <Image width={200} src={startup.image_url} />
            </center>
            <Title className="center">{startup.name}</Title>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default StartupDetails;
