import React, { useContext, useEffect } from "react";
import { useRequest } from "ahooks";
import { Image, Typography } from "antd";
import { Helmet } from "react-helmet";

import SiteContext from "../../providers/site/SiteContext";

const { Title } = Typography;

const StartupDetails = ({ startupSlug }) => {
  const { isMobile } = useContext(SiteContext);

  const { data: startup } = useRequest(`/api/v1/startups/${startupSlug}`);

  return (
    <>
      <Helmet>
        <title>{startup ? `${startup.name}` : "Startup"}</title>
      </Helmet>

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
